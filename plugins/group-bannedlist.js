/**
 * Group-specific banned users list command
 * Shows all users that are banned in the current group
 */

let handler = async (m, { conn, isOwner, isAdmin, groupMetadata }) => {
    if (!m.isGroup) return m.reply('⚠️ Dieser Befehl funktioniert nur in Gruppen.');
    
    // Check permissions - only owner or admin can use this
    const senderData = groupMetadata.participants.find(p => p.id === m.sender);
    const isGroupAdmin = senderData?.admin === 'admin' || senderData?.admin === 'superadmin';
    
    if (!(isGroupAdmin || isOwner)) {
        return m.reply('⚠️ Nur Gruppen-Admins und Besitzer können diesen Befehl verwenden.');
    }
    
    // Ensure group data exists
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};
    
    // Get banned users in this group
    const bannedUsersInGroup = [];
    for (const [userId, userData] of Object.entries(global.db.data.chats[m.chat].memgc || {})) {
        if (userData && userData.banned) {
            bannedUsersInGroup.push({
                userId: userId,
                bannedTime: userData.bannedTime || 0,
                warn: userData.warn || 0
            });
        }
    }
    
    // Sort by bannedTime (most recent first)
    bannedUsersInGroup.sort((a, b) => b.bannedTime - a.bannedTime);
    
    if (bannedUsersInGroup.length === 0) {
        return m.reply('📊 *Gesperrte Nutzer in dieser Gruppe*\n\nEs gibt keine gesperrten Mitglieder in dieser Gruppe.');
    }
    
    // Build the message
    let message = '📊 *Gesperrte Nutzer in dieser Gruppe*\n\n';
    
    for (let i = 0; i < bannedUsersInGroup.length; i++) {
        const user = bannedUsersInGroup[i];
        const userName = await conn.getName(user.userId);
        let tempBanInfo = '';
        
        // Add temporary ban info if applicable
        if (user.bannedTime && user.bannedTime > Date.now()) {
            const remainingTime = Math.ceil((user.bannedTime - Date.now()) / 1000 / 60); // minutes
            tempBanInfo = ` ⏳ (noch ${remainingTime} min)`;
        }
        
        message += `${i+1}. @${user.userId.split('@')[0]} - ${user.warn || 0} Verwarnungen${tempBanInfo}\n`;
    }
    
    message += `\nVerwende '.delwarn @nutzer' um Verwarnungen zurückzusetzen und Sperren aufzuheben.`;
    
    await conn.sendMessage(m.chat, {
        text: message,
        mentions: bannedUsersInGroup.map(u => u.userId)
    }, { quoted: m });
};

handler.help = ['groupbans', 'groupbanlist', 'gruppensperren'];
handler.tags = ['group', 'admin'];
handler.command = /^gr(oup|uppen)ban(list|s|ned)?|gruppensperren$/i;
handler.group = true;

module.exports = handler;