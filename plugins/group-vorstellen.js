const Intro = require('./intro'); // Import the MongoDB model

let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.');

    const groupId = m.chat;

    // introcode setzen
    if (command === 'introcode') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen den Vorstellungsprozess starten.');

        // Check if the intro code exists for the group
        let introData = await Intro.findOne({ groupId });

        if (!introData) {
            // Generate a new code if it doesn't exist
            const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

            // Save the new code to MongoDB
            introData = new Intro({
                groupId,
                introCode: newCode,  // Ensure the introCode is set
                introducedUsers: {}  // Default empty introducedUsers object
            });

            await introData.save();
        }

        const participants = (await conn.groupMetadata(groupId)).participants.map(u => u.id);
        const tagList = participants.map(p => '@' + p.split('@')[0]).join(' ');

        return m.reply(
            `📢 *Vorstellungsrunde gestartet!*\n\n` +
            `Verwende den Code: *${introData.introCode}*\n` +
            `Beispiel: .vorstellen Max 16 Berlin ${introData.introCode}\n\n` +
            `${tagList}`,
            null,
            { mentions: participants }
        );
    }

    // vorstellen
    if (command === 'vorstellen') {
        const currentIntroData = await Intro.findOne({ groupId });

        if (!currentIntroData) return m.reply('❌ Es wurde noch kein Vorstellungscode festgelegt.');
        if (!text) return m.reply('Bitte sende deine Daten wie z. B.: .vorstellen Max 16 Berlin ABC123');

        let { name, alter, ort, code } = parseIntroInput(text);

        if (code !== currentIntroData.introCode) return m.reply('❌ Falscher oder fehlender Code.');
        if (!name || !alter || !ort) {
            return m.reply('❌ Bitte gib Name, Alter und Wohnort an.');
        }

        // Check if the user has already introduced themselves
        if (currentIntroData.introducedUsers.has(m.sender)) {
            return m.reply('❌ Du hast dich bereits vorgestellt.');
        }

        // Save the user introduction in MongoDB
        currentIntroData.introducedUsers.set(m.sender, { name, alter, ort });
        await currentIntroData.save();

        return m.reply(`✅ *Vorstellung erfolgreich!*\n\n*Name:* ${name}\n*Alter:* ${alter}\n*Wohnort:* ${ort}`);
    }

    // checkintro
    if (command === 'checkintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        let currentIntroData = await Intro.findOne({ groupId });
        let participants = (await conn.groupMetadata(groupId)).participants.map(p => p.id);
        let nichtVorgestellt = participants.filter(p => !currentIntroData.introducedUsers.has(p) && !p.endsWith(conn.user.jid));

        if (nichtVorgestellt.length === 0) return m.reply('✅ Alle Mitglieder haben sich vorgestellt!');

        let list = nichtVorgestellt.map(p => '• @' + p.split('@')[0]).join('\n');
        return m.reply(`*Noch nicht vorgestellt:*\n\n${list}`, null, { mentions: nichtVorgestellt });
    }

    // introlist
    if (command === 'introlist') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        let currentIntroData = await Intro.findOne({ groupId });
        let list = Array.from(currentIntroData.introducedUsers.entries()).map(([id, data]) =>
            `• @${id.split('@')[0]} - *Name:* ${data.name}, *Alter:* ${data.alter}, *Wohnort:* ${data.ort}`
        ).join('\n');

        if (!list) return m.reply('❌ Es hat sich noch niemand vorgestellt.');

        return m.reply(`*Bereits vorgestellte Mitglieder:*\n\n${list}`, null, {
            mentions: Array.from(currentIntroData.introducedUsers.keys())
        });
    }

    // delintro - Delete the intro code after everyone has introduced themselves
    if (command === 'delintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        let currentIntroData = await Intro.findOne({ groupId });
        if (!currentIntroData) return m.reply('❌ Es gibt keinen Vorstellungscode, den man löschen könnte.');

        // Check if all members have introduced themselves
        let participants = (await conn.groupMetadata(groupId)).participants.map(p => p.id);
        let nichtVorgestellt = participants.filter(p => !currentIntroData.introducedUsers.has(p) && !p.endsWith(conn.user.jid));

        if (nichtVorgestellt.length > 0) return m.reply(`❌ Es haben sich noch nicht alle Mitglieder vorgestellt. ${nichtVorgestellt.length} Mitglieder müssen sich noch vorstellen.`);

        // All members have introduced themselves, so delete the intro code
        await Intro.deleteOne({ groupId });

        return m.reply('✅ Alle Mitglieder haben sich vorgestellt. Der Vorstellungscode wurde gelöscht.');
    }
};

handler.help = ['introcode', 'vorstellen <Name Alter Ort Code>', 'checkintro', 'introlist', 'delintro'];
handler.tags = ['group'];
handler.command = /^introcode$|^vorstellen$|^checkintro$|^introlist$|^delintro$/i;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
