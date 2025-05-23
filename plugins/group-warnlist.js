let handler = async (m, { conn, groupMetadata, usedPrefix, command }) => {
    if (!m.isGroup) throw '❌ Dieser Befehl funktioniert nur in Gruppen.';

    // Gruppendaten abrufen, Admins prüfen
    const group = await conn.groupMetadata(m.chat);
    const senderData = group.participants.find(p => p.id === m.sender);
    const isAdmin = senderData?.admin === 'admin' || senderData?.admin === 'superadmin';

    if (!isAdmin && !m.isOwner) {
        return m.reply('❌ Nur Gruppen-Admins dürfen diesen Befehl verwenden.');
    }

    // Ensure group data exists
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {};

    // Get all members with warnings
    const warnedMembers = [];
    
    // Debug info
    console.log(`Group ID: ${m.chat}`);
    console.log(`Group memgc entries: ${Object.keys(global.db.data.chats[m.chat]?.memgc || {}).length}`);
    
    for (const [userId, userData] of Object.entries(global.db.data.chats[m.chat].memgc || {})) {
        // Debug the user data
        console.log(`Checking user ${userId}: warn=${userData?.warn}, banned=${userData?.banned}`);
        
        // Only include users who actually have warnings (warn > 0)
        if (userData && userData.warn && userData.warn > 0) {
            // Validate that this user exists in the group
            const userInGroup = group.participants.find(p => {
                try {
                    // Try multiple comparison methods to ensure matching
                    // Normalize both IDs for comparison
                    const normalizedGroupId = p.id.replace(/:\d+@/, '@');
                    const normalizedUserId = userId.replace(/:\d+@/, '@');
                    
                    // Also try to match just the phone numbers
                    const userPhone = userId.split('@')[0].replace(/[^0-9]/g, '');
                    const participantPhone = p.id.split('@')[0].replace(/[^0-9]/g, '');
                    
                    const isMatch = normalizedGroupId === normalizedUserId || userPhone === participantPhone;
                    console.log(`Matching ${userId} with ${p.id}: ${isMatch}`);
                    return isMatch;
                } catch (err) {
                    console.log("Error comparing IDs:", err);
                    return false;
                }
            });
            
            if (userInGroup) {
                warnedMembers.push({
                    userId: userId,
                    warn: userData.warn || 0,
                    banned: userData.banned || false,
                    bannedTime: userData.bannedTime || 0
                });
                console.log(`Added user ${userId} to warned list with ${userData.warn} warnings`);
            } else {
                console.log(`User ${userId} not found in group, skipping`);
            }
        }
    }

    // Sort by warnings (highest first)
    warnedMembers.sort((a, b) => b.warn - a.warn);

    if (warnedMembers.length === 0) {
        return m.reply('📊 *Verwarnungsliste*\n\nEs gibt keine verwarnten Mitglieder in dieser Gruppe.');
    }

    // Build the message
    let message = '📊 *Verwarnungsliste*\n\n';
    
    for (let i = 0; i < warnedMembers.length; i++) {
        const member = warnedMembers[i];
        const userName = await conn.getName(member.userId);
        const banStatus = member.banned ? ' ⛔ (gebannt)' : '';
        let tempBanInfo = '';
        
        // Add temporary ban info if applicable
        if (member.bannedTime && member.bannedTime > Date.now()) {
            const remainingTime = Math.ceil((member.bannedTime - Date.now()) / 1000 / 60); // minutes
            tempBanInfo = ` ⏳ (${remainingTime} min)`;
        }
        
        message += `${i+1}. @${member.userId.split('@')[0]} - ${member.warn} Verwarnungen${banStatus}${tempBanInfo}\n`;
    }
    
    message += `\nVerwende '${usedPrefix}delwarn @user' um Verwarnungen zurückzusetzen.`;

    await conn.sendMessage(m.chat, {
        text: message,
        mentions: warnedMembers.map(m => m.userId)
    }, { quoted: m });
};

handler.help = ['warnlist'];
handler.tags = ['group'];
handler.command = ['warnlist', 'listwarn', 'warnings'];
handler.group = true;

module.exports = handler;