let handler = async (m, { conn, text, participants, isOwner, usedPrefix, command, isAdmin }) => {
    if (!m.isGroup) throw '❗ Dieser Befehl funktioniert nur in Gruppen!';

    let who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!who) throw `🔎 Bitte markiere den Nutzer, den du verwarnen möchtest.\n\n💡 Beispiel: ${usedPrefix + command} @nutzer`;

    if (!(isAdmin || isOwner)) return m.reply('🚫 Nur Gruppen-Admins dürfen diesen Befehl verwenden!');
    if (!global.db.data.users[who]) global.db.data.users[who] = {};

    const chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});
    const memgc = chat.memgc || (chat.memgc = {});
    const userData = memgc[who] || (memgc[who] = { warn: 0, banned: false, bannedTime: 0 });

    let globalWarn = global.db.data.users[who].warn || 0;
    let groupWarn = userData.warn || 0;
    let maxwarn = global.maxwarn || 3;

    globalWarn++;
    groupWarn++;
    global.db.data.users[who].warn = globalWarn;
    userData.warn = groupWarn;

    const userTag = '@' + who.split('@')[0];
    const adminTag = '@' + m.sender.split('@')[0];

    if (groupWarn >= maxwarn) {
        userData.banned = true;
        userData.bannedTime = Date.now();
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
        await conn.sendMessage(m.chat, {
            text: `⛔ *${userTag} wurde wegen zu vieler Verwarnungen entfernt!*\n\n📌 *Erreichte Warnstufe:* ${groupWarn}/${maxwarn}`,
            mentions: [who]
        }, { quoted: m });
        return;
    }

    await conn.sendMessage(m.chat, {
        text: `⚠️ *Verwarnung erhalten!*\n─────────────────────\n👤 *Admin:* ${adminTag}\n🙎‍♂️ *Nutzer:* ${userTag}\n📌 *Warnstufe:* ${groupWarn}/${maxwarn}`,
        mentions: [who, m.sender]
    }, { quoted: m });
};

handler.help = ['warn @nutzer'];
handler.tags = ['group'];
handler.command = /^warn$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
