let handler = async (m, { conn, participants, groupMetadata }) => {
    if (!m.isGroup) throw '❗ Dieser Befehl funktioniert nur in Gruppen!';
    
    const chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});
    const memgc = chat.memgc || {};
    const maxwarn = global.maxwarn || 3;

    let text = `📋 *Warnliste – ${groupMetadata.subject}*\n─────────────────────\n`;
    let mentionedJid = [];

    for (let user of participants) {
        let warnData = memgc[user.id];
        if (warnData && warnData.warn > 0) {
            text += `👤 @${user.id.split('@')[0]} → ${warnData.warn}/${maxwarn} Warnungen\n`;
            mentionedJid.push(user.id);
        }
    }

    if (mentionedJid.length === 0) {
        text += '✅ *Kein Mitglied hat derzeit Warnungen!*';
    }

    await conn.sendMessage(m.chat, { text, mentions: mentionedJid }, { quoted: m });
};

handler.help = ['warnlist'];
handler.tags = ['group'];
handler.command = /^warnlist$/i;
handler.group = true;

module.exports = handler;
