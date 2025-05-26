let handler = async (m, { conn, text, participants, isOwner, usedPrefix, command, isAdmin }) => {
    if (!m.isGroup) throw '❗ Dieser Befehl funktioniert nur in Gruppen!';

    let who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!who) throw `🔎 Bitte markiere den Nutzer, dessen Warnung du entfernen möchtest.\n\n💡 Beispiel: ${usedPrefix + command} @nutzer`;

    if (!(isAdmin || isOwner)) {
        return m.reply('🚫 Nur Gruppen-Admins dürfen diesen Befehl verwenden!');
    }

    // Datenbank vorbereiten
    if (!global.db.data.users[who]) throw '❌ Nutzer wurde in der Datenbank nicht gefunden.';

    const chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});
    const memgc = chat.memgc || (chat.memgc = {});
    const userData = memgc[who] || (memgc[who] = { warn: 0, banned: false, bannedTime: 0 });

    let globalWarn = global.db.data.users[who].warn || 0;
    let groupWarn = userData.warn || 0;

    if (globalWarn === 0 && groupWarn === 0) {
        throw `⚠️ *${conn.getName(who)}* hat keine Warnungen.`;
    }

    // Warnungen zurücksetzen
    global.db.data.users[who].warn = 0;
    userData.warn = 0;

    // Sperrung zurücksetzen, falls vorhanden
    if (userData.banned) {
        userData.banned = false;
        userData.bannedTime = 0;
    }

    const adminTag = '@' + m.sender.split('@')[0];
    const userTag = '@' + who.split('@')[0];
    const maxwarn = global.maxwarn || 3;

    // Schöne Nachricht senden
    await conn.sendMessage(m.chat, {
        text: `
✅ *Warnung entfernt!*
─────────────────────
👤 *Admin:* ${adminTag}
🙎‍♂️ *Nutzer:* ${userTag}
📌 *Verbleibende Warnungen:* 0/${maxwarn}
─────────────────────
💡 Der Nutzer wurde zurückgesetzt und ist wieder aktiv!
        `.trim(),
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