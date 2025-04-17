let introCode = null;
let vorgestellteUser = {};

function parseIntroInput(text) {
    let parts = text.trim().split(/\s+/);

    let name = '', alter = '', ort = '', code = '';

    for (let part of parts) {
        if (/^\d{1,2}$/.test(part)) {
            alter = part;
        } else if (/^[A-Z0-9]{6,}$/.test(part)) {
            code = part.toUpperCase();
        } else if (!name) {
            name = part;
        } else {
            ort += (ort ? ' ' : '') + part;
        }
    }

    return { name, alter, ort, code };
}

let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.');

    let groupId = m.chat;

    // Admin startet Vorstellungsrunde
    if (command === 'introcode') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen den Vorstellungsprozess starten.');
        introCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        vorgestellteUser[groupId] = {};
        let participants = (await conn.groupMetadata(groupId)).participants.map(u => u.id);
        let tagList = participants.map(p => '@' + p.split('@')[0]).join(' ');
        return m.reply(
            `*Vorstellungsrunde gestartet!*\n\n` +
            `Verwende den Code: *${introCode}*\n` +
            `Beispiel: .vorstellen Max 16 Berlin ${introCode}\n\n` +
            `${tagList}`,
            null,
            { mentions: participants }
        );
    }

    // Nutzer stellt sich vor
    if (command === 'vorstellen') {
        if (!introCode) return m.reply('❌ Es wurde noch kein Vorstellungscode festgelegt.');
        if (!text) return m.reply('Bitte sende deine Daten wie z. B.: .vorstellen Max 16 Berlin ABC123');

        let { name, alter, ort, code } = parseIntroInput(text);

        if (code !== introCode) return m.reply('❌ Falscher oder fehlender Code.');
        if (!name || !alter || !ort) {
            return m.reply('❌ Bitte gib Name, Alter und Wohnort an.');
        }

        vorgestellteUser[groupId] = vorgestellteUser[groupId] || {};

        if (vorgestellteUser[groupId][m.sender]) {
            return m.reply('❌ Du hast dich bereits vorgestellt.');
        }

        vorgestellteUser[groupId][m.sender] = {
            name,
            alter,
            ort
        };

        return m.reply(`✅ *Vorstellung erfolgreich!*\n\n*Name:* ${name}\n*Alter:* ${alter}\n*Wohnort:* ${ort}`);
    }

    // Admin überprüft wer fehlt
    if (command === 'checkintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.');
        if (!vorgestellteUser[groupId]) return m.reply('Es gibt keine laufende Vorstellungsrunde.');

        let participants = (await conn.groupMetadata(groupId)).participants.map(p => p.id);
        let vorgestellt = Object.keys(vorgestellteUser[groupId]);
        let nichtVorgestellt = participants.filter(p => !vorgestellt.includes(p) && !p.endsWith(conn.user.jid));

        if (nichtVorgestellt.length === 0) return m.reply('✅ Alle Mitglieder haben sich vorgestellt!');

        let list = nichtVorgestellt.map(p => '• @' + p.split('@')[0]).join('\n');
        return m.reply(`*Noch nicht vorgestellt:*\n\n${list}`, null, { mentions: nichtVorgestellt });
    }
};

handler.help = ['introcode', 'vorstellen <Daten>', 'checkintro'];
handler.tags = ['group'];
handler.command = /^introcode$|^vorstellen$|^checkintro$/i;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
