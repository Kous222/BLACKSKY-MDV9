let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`✳️ Benutze: ${usedPrefix + command} @user <Grund>\nBeispiel: ${usedPrefix + command} @user Spam`);
    
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
    
    // Check if user is the bot owner
    let isOwner = false;
    if (global.owner && Array.isArray(global.owner)) {
        for (let ownerNumber of global.owner) {
            const ownerJid = ownerNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (mention === ownerJid) {
                isOwner = true;
                break;
            }
        }
    }
    
    if (isOwner) {
        return m.reply(`❌ Du kannst den Bot-Besitzer nicht bannen.`);
    }

    // Parse duration if provided
    const durationArg = args[1] ? args[1].toLowerCase() : '';
    let duration = 0; // Default: permanent ban
    let banType = 'permanent';
    
    if (durationArg) {
        if (durationArg.endsWith('h')) {
            banType = 'temporary';
            const hours = parseInt(durationArg);
            if (!isNaN(hours)) {
                duration = hours * 60 * 60 * 1000; // Convert hours to milliseconds
            }
        } else if (durationArg.endsWith('d')) {
            banType = 'temporary';
            const days = parseInt(durationArg);
            if (!isNaN(days)) {
                duration = days * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            }
        } else if (durationArg === 'permanent' || durationArg === 'perm') {
            banType = 'permanent';
            duration = 0;
        }
    }
    
    // Get the reason from args (skip the user and duration)
    let reason = args.slice(banType === 'permanent' ? 1 : 2).join(' ') || 'Kein Grund angegeben';
    
    // Apply the ban
    user.banned = true;
    
    if (banType === 'temporary' && duration > 0) {
        user.bannedTime = Date.now() + duration;
        
        // Human-readable duration
        const hours = Math.floor(duration / (60 * 60 * 1000));
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        let durationText = '';
        
        if (days > 0) {
            durationText += `${days} Tag${days > 1 ? 'e' : ''}`;
        }
        if (remainingHours > 0) {
            if (durationText) durationText += ' und ';
            durationText += `${remainingHours} Stunde${remainingHours > 1 ? 'n' : ''}`;
        }
        
        // If the user is in a group, also ban them in that group
        if (m.isGroup) {
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
            if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
            if (!global.db.data.chats[m.chat].memgc[mention]) {
                global.db.data.chats[m.chat].memgc[mention] = {
                    banned: true,
                    bannedTime: user.bannedTime,
                    warn: 0
                };
            } else {
                global.db.data.chats[m.chat].memgc[mention].banned = true;
                global.db.data.chats[m.chat].memgc[mention].bannedTime = user.bannedTime;
            }
        }
        
        await m.reply(`✅ *Temporärer Ban*\n\n• *Benutzer:* @${mention.split('@')[0]}\n• *Dauer:* ${durationText}\n• *Grund:* ${reason}`, null, { mentions: [mention] });
        await conn.sendMessage(mention, { text: `⚠️ *Du wurdest temporär gebannt*\n\n• *Dauer:* ${durationText}\n• *Grund:* ${reason}\n\nDu kannst keine Bot-Befehle verwenden, bis der Ban aufgehoben wird.` });
        
        // Set a timeout to automatically unban
        setTimeout(async () => {
            if (global.db.data.users[mention]) {
                // Check if ban is still active
                if (global.db.data.users[mention].bannedTime > Date.now()) {
                    global.db.data.users[mention].banned = false;
                    global.db.data.users[mention].bannedTime = 0;
                    
                    // Also unban in the group if needed
                    if (m.isGroup && 
                        global.db.data.chats[m.chat] && 
                        global.db.data.chats[m.chat].memgc && 
                        global.db.data.chats[m.chat].memgc[mention]) {
                        global.db.data.chats[m.chat].memgc[mention].banned = false;
                        global.db.data.chats[m.chat].memgc[mention].bannedTime = 0;
                    }
                    
                    console.log(`Auto unban for user: ${mention} completed`);
                    await conn.sendMessage(mention, { text: `✅ Dein temporärer Ban wurde aufgehoben. Du kannst nun wieder Bot-Befehle verwenden.` });
                }
            }
        }, duration);
        
    } else {
        // Permanent ban
        user.bannedTime = 0;
        
        // If the user is in a group, also ban them in that group
        if (m.isGroup) {
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
            if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
            if (!global.db.data.chats[m.chat].memgc[mention]) {
                global.db.data.chats[m.chat].memgc[mention] = {
                    banned: true,
                    bannedTime: 0,
                    warn: 0
                };
            } else {
                global.db.data.chats[m.chat].memgc[mention].banned = true;
                global.db.data.chats[m.chat].memgc[mention].bannedTime = 0;
            }
        }
        
        await m.reply(`✅ *Permanenter Ban*\n\n• *Benutzer:* @${mention.split('@')[0]}\n• *Grund:* ${reason}`, null, { mentions: [mention] });
        await conn.sendMessage(mention, { text: `⚠️ *Du wurdest permanent gebannt*\n\n• *Grund:* ${reason}\n\nDu kannst keine Bot-Befehle mehr verwenden, bis ein Administrator den Ban aufhebt.` });
    }
    
    console.log(`Ban executed - User: ${mention}, Type: ${banType}, Duration: ${duration}ms, Reason: ${reason}`);
};

handler.help = ['ban @user <duration> <reason>'];
handler.tags = ['owner'];
handler.command = /^(ban|b)$/i;
handler.owner = true;

module.exports = handler;