let handler = async (m, { conn, text, participants, isOwner, usedPrefix, command, isAdmin }) => {
    if (!m.isGroup) throw '❗ Dieser Befehl funktioniert nur in Gruppen.';

    let who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!who) throw `✳️ Bitte markiere den Nutzer, dessen Warnung du entfernen möchtest.\n\n📌 Beispiel: ${usedPrefix + command} @nutzer`;

    if (!(isAdmin || isOwner)) {
        return m.reply('❌ Nur Gruppen-Admins dürfen diesen Befehl verwenden.');
    }

    if (!(who in global.db.data.users)) {
        throw `❌ Nutzer nicht in der Datenbank.`;
    }

    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
    if (!global.db.data.chats[m.chat].memgc[who]) {
        global.db.data.chats[m.chat].memgc[who] = {
            warn: 0,
            banned: false,
            bannedTime: 0
        };
    }

    let globalWarn = global.db.data.users[who]?.warn || 0;
    let groupWarn = global.db.data.chats[m.chat].memgc[who]?.warn || 0;

    if (globalWarn === 0 && groupWarn === 0) throw `⚠️ Der Nutzer hat keine Warnungen.`;

    global.db.data.users[who].warn = 0;
    global.db.data.chats[m.chat].memgc[who].warn = 0;

    if (global.db.data.chats[m.chat].memgc[who].banned) {
        global.db.data.chats[m.chat].memgc[who].banned = false;
        global.db.data.chats[m.chat].memgc[who].bannedTime = 0;
    }

    const adminTag = '@' + m.sender.split('@')[0];
    const userTag = '@' + who.split('@')[0];
    const maxwarn = global.maxwarn || 3;

    await conn.sendMessage(m.chat, {
        text: `⚠️ *Warnung entfernt*\n\n▢ *Admin:* ${adminTag}\n▢ *Nutzer:* ${userTag}\n▢ *Verbleibende Warnungen:* 0/${maxwarn}`,
        mentions: [who, m.sender]
    }, { quoted: m });
};

handler.help = ['delwarn @nutzer'];
handler.tags = ['group'];
handler.command = /^delwarn$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
