let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`✳️ Benutze: ${usedPrefix + command} @user oder user ID`);
    
    let mention = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null) || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    if (!mention) return m.reply(`✳️ Bitte gib einen Benutzer an`);
    
    let user = global.db.data.users[mention];
    
    if (!user) {
        global.db.data.users[mention] = {
            banned: false,
            bannedTime: 0
        };
        user = global.db.data.users[mention];
    }
    
    // Check if user is banned
    if (!user.banned && user.bannedTime <= 0) {
        return m.reply(`✳️ Dieser Benutzer ist nicht gebannt.`);
    }
    
    // Unban the user
    user.banned = false;
    user.bannedTime = 0;
    
    // If the user is in a group, also unban them in all groups
    for (let chatId in global.db.data.chats) {
        if (global.db.data.chats[chatId].memgc && global.db.data.chats[chatId].memgc[mention]) {
            global.db.data.chats[chatId].memgc[mention].banned = false;
            global.db.data.chats[chatId].memgc[mention].bannedTime = 0;
            console.log(`User ${mention} unbanned in group ${chatId}`);
        }
    }
    
    await m.reply(`✅ *Unban erfolgreich*\n\n• *Benutzer:* @${mention.split('@')[0]}\n• *Status:* Entbannt`, null, { mentions: [mention] });
    await conn.sendMessage(mention, { text: `✅ *Du wurdest entbannt*\n\nDu kannst nun wieder Bot-Befehle verwenden.` });
    
    console.log(`Unban executed - User: ${mention}`);
};

handler.help = ['unban @user'];
handler.tags = ['owner'];
handler.command = /^(unban)$/i;
handler.owner = true;

module.exports = handler;