let handler = async (m, { conn, text, args, usedPrefix, command, isOwner }) => {
    if (!args[0]) return m.reply(`✳️ Benutze: ${usedPrefix + command} @user\nBeispiel: ${usedPrefix + command} @user`);
    
    let mention = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null) || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    if (!mention) return m.reply(`✳️ Bitte gib einen Benutzer an`);
    
    // Check if the mention is a group
    if (mention.endsWith('g.us')) {
        try {
            global.db.data.chats[mention].isBanned = false;
            return m.reply(`✅ *Chat wurde entbannt*\n\n• *Chat:* ${await conn.getName(mention) || mention}\n\nDer Chat kann nun wieder Bot-Befehle verwenden.`);
        } catch (e) {
            console.log('Unban chat error:', e);
            throw `Chat nicht in der Datenbank gefunden!`;
        }
    }
    
    // User unban
    try {
        let user = global.db.data.users[mention];
        
        if (!user) {
            global.db.data.users[mention] = {
                banned: false,
                bannedTime: 0
            };
            return m.reply(`✅ *Benutzer nicht gebannt*\n\n• *Benutzer:* @${mention.split('@')[0]}\n\nDieser Benutzer war nicht gebannt.`, null, { mentions: [mention] });
        }
        
        // Check if user is actually banned
        if (!user.banned && user.bannedTime === 0) {
            return m.reply(`✅ *Benutzer nicht gebannt*\n\n• *Benutzer:* @${mention.split('@')[0]}\n\nDieser Benutzer war nicht gebannt.`, null, { mentions: [mention] });
        }
        
        // Remove the ban
        user.banned = false;
        user.bannedTime = 0;
        
        // If the user is in a group, also unban them in that group
        if (m.isGroup) {
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
            if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
            if (global.db.data.chats[m.chat].memgc[mention]) {
                global.db.data.chats[m.chat].memgc[mention].banned = false;
                global.db.data.chats[m.chat].memgc[mention].bannedTime = 0;
            }
        }
        
        await m.reply(`✅ *Ban aufgehoben*\n\n• *Benutzer:* @${mention.split('@')[0]}\n\nDer Benutzer kann nun wieder Bot-Befehle verwenden.`, null, { mentions: [mention] });
        await conn.sendMessage(mention, { text: `✅ *Dein Ban wurde aufgehoben*\n\nDu kannst nun wieder Bot-Befehle verwenden.` });
        
        console.log(`Unban executed - User: ${mention}`);
    } catch (e) {
        console.log('Unban user error:', e);
        throw `Nutzer nicht in der Datenbank gefunden!`;
    }
}
handler.help = ['unban @user/group']
handler.tags = ['owner']
handler.command = /^unban(chat)?$/i

handler.owner = true
module.exports = handler
