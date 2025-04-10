let war = global.maxwarn || 3;

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command, isAdmin, isOwner }) => {
    if (!m.isGroup) throw '❌ Dieser Befehl funktioniert nur in Gruppen.';
    if (!isAdmin && !isOwner) {
        return m.reply('❌ Nur Gruppen-Admins dürfen diesen Befehl verwenden.');
    }

    const group = await conn.groupMetadata(m.chat);
    let who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    if (!who) throw `✳️ Bitte gib den Nutzer an, den du verwarnen möchtest.\n\n📌 Beispiel: ${usedPrefix + command} @user`;

    if (!(who in global.db.data.users)) throw `✳️ Nutzer nicht in der Datenbank gefunden.`;

    let warn = global.db.data.users[who].warn || 0;

    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
    if (!global.db.data.chats[m.chat].memgc[who]) {
        global.db.data.chats[m.chat].memgc[who] = {
            warn: 0,
            banned: false,
            bannedTime: 0
        };
    }

    let groupWarn = global.db.data.chats[m.chat].memgc[who].warn || 0;

    let reason = text ? text.trim() : 'Kein Grund angegeben';

    if (groupWarn < war) {
        global.db.data.users[who].warn += 1;
        global.db.data.chats[m.chat].memgc[who].warn += 1;

        warn += 1;
        groupWarn += 1;

        await conn.sendMessage(m.chat, {
            text: `⚠️ *Verwarnung*\n\n▢ *Admin:* @${m.sender.split('@')[0]}\n▢ *Nutzer:* @${who.split('@')[0]}\n▢ *Warnung:* ${groupWarn}/${war}\n▢ *Grund:* ${reason}`,
            mentions: [who, m.sender]
        }, { quoted: m });

        await conn.sendMessage(who, {
            text: `⚠️ *Du hast eine Verwarnung erhalten!*\n\n▢ *Grund:* ${reason}\n▢ *Status:* ${groupWarn}/${war}\n▢ *Gruppe:* ${group.subject}\n\nBei *${war}* Warnungen wirst du automatisch aus der Gruppe entfernt.`
        });
    } else {
        global.db.data.users[who].warn = 0;
        global.db.data.chats[m.chat].memgc[who].warn = 0;
        global.db.data.chats[m.chat].memgc[who].banned = true;

        const banExpiry = Date.now() + (24 * 60 * 60 * 1000);
        global.db.data.chats[m.chat].memgc[who].bannedTime = banExpiry;

        await conn.sendMessage(m.chat, { 
            text: `⛔ *Maximale Anzahl an Warnungen erreicht!* Nutzer wird entfernt und für 24 Stunden gebannt...` 
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
