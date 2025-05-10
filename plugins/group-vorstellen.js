const Intro = require('../lib/Intro'); // MongoDB Model
const moment = require('moment'); // For date/time handling

function parseIntroInput(input) {
    const parts = input.trim().split(/\s+/);
    if (parts.length < 4) {
        return { name: null, alter: null, ort: null, code: null };
    }

    const name = parts[0];
    const alter = parts[1];
    const ort = parts.slice(2, parts.length - 1).join(' ');
    const code = parts[parts.length - 1];

    return { name, alter, ort, code };
}

let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.');

    const groupId = m.chat;

    // Log groupId to check if it's being passed correctly
    console.log("Group ID:", groupId);

    // Ensure global.cachedParticipants is initialized
    global.cachedParticipants = global.cachedParticipants || {};

    // Ensure groupId cache exists
    if (!global.cachedParticipants[groupId]) {
        global.cachedParticipants[groupId] = []; // Initialize as an empty array if undefined
    }

    let cachedParticipants = global.cachedParticipants[groupId] || [];
    console.log("Cached Participants before check:", cachedParticipants);

    // If participants list is empty, fetch group metadata
    if (cachedParticipants.length === 0) {
        try {
            console.log(`Fetching metadata for group ${groupId}...`);
            const groupMeta = await conn.groupMetadata(groupId);
            cachedParticipants = groupMeta.participants.map(u => u.id);
            global.cachedParticipants[groupId] = cachedParticipants;  // Cache the participants list
            console.log(`Cached Participants after fetch:`, cachedParticipants);
        } catch (error) {
            console.error('Error fetching group metadata:', error);
            return m.reply('❌ Fehler beim Abrufen der Gruppendaten.');
        }
    }

    // Commands
    if (command === 'introcode') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen den Vorstellungsprozess starten.');

        let introData = await Intro.findOne({ groupId });

        if (!introData) {
            const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

            introData = new Intro({
                groupId,
                introCode: newCode,
                introducedUsers: {}
            });

            await introData.save();
        }

        const tagList = cachedParticipants.map(p => '@' + p.split('@')[0]).join(' ');

        return m.reply(
            `📢 *Vorstellungsrunde gestartet!*\n\n` +
            `Verwende den Code: *${introData.introCode}*\n` +
            `Beispiel: .vorstellen Max 16 Berlin ${introData.introCode}\n\n` +
            `${tagList}`,
            null,
            { mentions: cachedParticipants }
        );
    }

    if (command === 'vorstellen') {
        const currentIntroData = await Intro.findOne({ groupId });

        if (!currentIntroData) return m.reply('❌ Es wurde noch kein Vorstellungscode festgelegt.');
        if (!text) return m.reply('Bitte sende deine Daten wie z. B.: .vorstellen Max 16 Berlin ABC123');

        let { name, alter, ort, code } = parseIntroInput(text);

        if (code !== currentIntroData.introCode) return m.reply('❌ Falscher oder fehlender Code.');
        if (!name || !alter || !ort) return m.reply('❌ Bitte gib Name, Alter und Wohnort an.');

        if (currentIntroData.introducedUsers[m.sender]) {
            return m.reply('❌ Du hast dich bereits vorgestellt.');
        }

        // Ensure introducedUsers is initialized
        if (!currentIntroData.introducedUsers) {
            currentIntroData.introducedUsers = {};
        }

        // Save the user's introduction in the object
        currentIntroData.introducedUsers[m.sender] = { name, alter, ort };

        await currentIntroData.save();

        return m.reply(`✅ *Vorstellung erfolgreich!*\n\n*Name:* ${name}\n*Alter:* ${alter}\n*Wohnort:* ${ort}`);
    }

    if (command === 'checkintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        let currentIntroData = await Intro.findOne({ groupId });
        if (!currentIntroData) return m.reply('❌ Es gibt keine laufende Vorstellungsrunde.');

        let participants = cachedParticipants;
        let nichtVorgestellt = participants.filter(p => !(p in currentIntroData.introducedUsers) && p !== conn.user.jid);

        if (nichtVorgestellt.length === 0) return m.reply('✅ Alle Mitglieder haben sich vorgestellt!');

        let list = nichtVorgestellt.map(p => '• @' + p.split('@')[0]).join('\n');
        return m.reply(`*Noch nicht vorgestellt:*\n\n${list}`, null, { mentions: nichtVorgestellt });
    }

    if (command === 'introlist') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        let currentIntroData = await Intro.findOne({ groupId });
        if (!currentIntroData || Object.keys(currentIntroData.introducedUsers).length === 0)
            return m.reply('❌ Es hat sich noch niemand vorgestellt.');

        let list = Object.entries(currentIntroData.introducedUsers).map(([id, data]) =>
            `• @${id.split('@')[0]} - *Name:* ${data.name}, *Alter:* ${data.alter}, *Wohnort:* ${data.ort}`
        ).join('\n');

        return m.reply(`*Bereits vorgestellte Mitglieder:*\n\n${list}`, null, {
            mentions: Object.keys(currentIntroData.introducedUsers)
        });
    }

    if (command === 'delintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        let currentIntroData = await Intro.findOne({ groupId });
        if (!currentIntroData) return m.reply('❌ Es gibt keinen Vorstellungscode, den man löschen könnte.');

        await Intro.deleteOne({ groupId });
        return m.reply('✅ Die Vorstellungsrunde wurde gelöscht.');
    }
};

handler.help = ['introcode', 'vorstellen <Name Alter Ort Code>', 'checkintro', 'introlist', 'delintro'];
handler.tags = ['group'];
handler.command = /^introcode$|^vorstellen$|^checkintro$|^introlist$|^delintro$/i;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
