const Intro = require('../lib/Intro');
const moment = require('moment');

// Funktion zur Normalisierung der `jid` (ersetze "." mit "_")
function normalizeKey(jid) {
    return jid.replace(/\./g, '_');
}

function parseIntroInput(input) {
    const parts = input.trim().split(/\s+/);
    if (parts.length < 4) return { name: null, alter: null, ort: null, code: null };

    const name = parts[0];
    const alter = parts[1];
    const ort = parts.slice(2, parts.length - 1).join(' ');
    const code = parts[parts.length - 1];

    return { name, alter, ort, code };
}

let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.');
    const groupId = m.chat;

    global.cachedParticipants = global.cachedParticipants || {};
    if (!global.cachedParticipants[groupId]) {
        try {
            const groupMeta = await conn.groupMetadata(groupId);
            global.cachedParticipants[groupId] = groupMeta.participants.map(u => u.id);
        } catch (e) {
            return m.reply('❌ Fehler beim Laden der Gruppenmitglieder.');
        }
    }

    const cachedParticipants = global.cachedParticipants[groupId];

    if (command === 'introcode') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen den Vorstellungsprozess starten.');

        let introData = await Intro.findOne({ groupId });

        if (!introData) {
            const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            introData = new Intro({
                groupId,
                introCode: newCode,
                introducedUsers: new Map()
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
        const introData = await Intro.findOne({ groupId });
        if (!introData) return m.reply('❌ Es wurde noch kein Vorstellungscode festgelegt.');
        if (!text) return m.reply('Bitte sende deine Daten wie: .vorstellen Max 16 Berlin CODE');

        let { name, alter, ort, code } = parseIntroInput(text);
        if (code !== introData.introCode) return m.reply('❌ Falscher oder fehlender Code.');
        if (!name || !alter || !ort) return m.reply('❌ Bitte gib Name, Alter und Wohnort an.');

        const senderId = normalizeKey(m.sender); // Normalisiere den SenderID

        if (!introData.introducedUsers) introData.introducedUsers = new Map();

        if (introData.introducedUsers.has(senderId)) {
            return m.reply('❌ Du hast dich bereits vorgestellt.');
        }

        introData.introducedUsers.set(senderId, { name, alter, ort });
        await introData.save();

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        return m.reply(`✅ *Vorstellung erfolgreich!*\n\n*Name:* ${name}\n*Alter:* ${alter}\n*Wohnort:* ${ort}`);
    }

    if (command === 'checkintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        const introData = await Intro.findOne({ groupId });
        if (!introData) return m.reply('❌ Es gibt keine laufende Vorstellungsrunde.');

        const notIntroduced = cachedParticipants.filter(p =>
            !introData.introducedUsers?.has(normalizeKey(p)) && p !== conn.user.jid
        );

        if (notIntroduced.length === 0) return m.reply('✅ Alle Mitglieder haben sich vorgestellt!');

        const list = notIntroduced.map(p => '• @' + p.split('@')[0]).join('\n');
        return m.reply(`*Noch nicht vorgestellt:*\n\n${list}`, null, { mentions: notIntroduced });
    }

    if (command === 'introlist') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        const introData = await Intro.findOne({ groupId });
        if (!introData || !introData.introducedUsers || introData.introducedUsers.size === 0) {
            return m.reply('❌ Es hat sich noch niemand vorgestellt.');
        }

        const list = Array.from(introData.introducedUsers.entries()).map(([id, data]) =>
            `• @${id.split('@')[0]} - *Name:* ${data.name}, *Alter:* ${data.alter}, *Wohnort:* ${data.ort}`
        ).join('\n');

        return m.reply(`*Bereits vorgestellte Mitglieder:*\n\n${list}`, null, {
            mentions: Array.from(introData.introducedUsers.keys())
        });
    }

    if (command === 'delintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');

        const introData = await Intro.findOne({ groupId });
        if (!introData) return m.reply('❌ Es gibt keinen Vorstellungscode.');

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
