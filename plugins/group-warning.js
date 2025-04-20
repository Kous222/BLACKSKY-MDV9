const { delay } = require('@whiskeysockets/baileys');

let war = global.maxwarn || 3;

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command, isAdmin, isOwner }) => {
    if (!m.isGroup) throw '❌ Dieser Befehl funktioniert nur in Gruppen.';
    if (!isAdmin && !isOwner) return m.reply('❌ Nur Gruppen-Admins dürfen diesen Befehl verwenden.');

    const group = await conn.groupMetadata(m.chat);
    let who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!who) throw `✳️ Bitte gib den Nutzer an, den du verwarnen möchtest.\n\n📌 Beispiel: ${usedPrefix + command} @user`;
    if (!(who in global.db.data.users)) throw `✳️ Nutzer nicht in der Datenbank gefunden.`;

    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
    if (!global.db.data.chats[m.chat].memgc[who]) {
        global.db.data.chats[m.chat].memgc[who] = {
            warn: 0,
            banned: false,
            bannedTime: 0
        };
    }

    let userData = global.db.data.chats[m.chat].memgc[who];

    // Automatisch entbannen, wenn Bannzeit vorbei
    if (userData.banned && Date.now() >= userData.bannedTime) {
        userData.banned = false;
        userData.bannedTime = 0;
        m.reply(`✅ Nutzer @${who.split('@')[0]} wurde automatisch entbannt.`, null, { mentions: [who] });
    }

    if (userData.banned) {
        return m.reply(`⛔ Nutzer @${who.split('@')[0]} ist aktuell gebannt und kann nicht erneut verwarnt werden.`, null, { mentions: [who] });
    }

    let reason = text ? text.trim() : 'Kein Grund angegeben';
    let groupWarn = userData.warn;

    if (groupWarn < war) {
        global.db.data.users[who].warn = (global.db.data.users[who].warn || 0) + 1;
        userData.warn += 1;

        await conn.sendMessage(m.chat, {
            text: `⚠️ *Verwarnung*\n\n▢ *Admin:* @${m.sender.split('@')[0]}\n▢ *Nutzer:* @${who.split('@')[0]}\n▢ *Warnung:* ${userData.warn}/${war}\n▢ *Grund:* ${reason}`,
            mentions: [who, m.sender]
        }, { quoted: m });

        await conn.sendMessage(who, {
            text: `⚠️ *Du hast eine Verwarnung erhalten!*\n\n▢ *Grund:* ${reason}\n▢ *Status:* ${userData.warn}/${war}\n▢ *Gruppe:* ${group.subject}\n\nBei *${war}* Warnungen wirst du automatisch aus der Gruppe entfernt.`
        });
    } else {
        global.db.data.users[who].warn = 0;
        userData.warn = 0;
        userData.banned = true;
        userData.bannedTime = Date.now() + (24 * 60 * 60 * 1000); // 24h Bann

        await conn.sendMessage(m.chat, { 
            text: `⛔ *Maximale Anzahl an Warnungen erreicht!*\n@${who.split('@')[0]} wird entfernt und für 24 Stunden gebannt...`, 
            mentions: [who] 
        }, { quoted: m });

        await delay(3000);
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');

        await conn.sendMessage(who, {
            text: `❌ Du wurdest aus der Gruppe *${group.subject}* entfernt, da du *${war}* Verwarnungen erhalten hast. Du bist für 24 Stunden gebannt.`
        });
    }
};

handler.help = ['warn @user'];
handler.tags = ['group'];
handler.command = ['warn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
