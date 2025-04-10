let handler = async (m, { conn, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    
    // Get group-banned users (from each group's memgc object)
    let groupBannedUsers = []
    
    // Check each chat for banned users in its memgc
    for (const [chatId, chatData] of Object.entries(global.db.data.chats)) {
        if (chatData.memgc) {
            for (const [userId, userData] of Object.entries(chatData.memgc)) {
                if (userData.banned) {
                    groupBannedUsers.push({
                        userId: userId,
                        groupId: chatId,
                        bannedTime: userData.bannedTime || 0
                    })
                }
            }
        }
    }
    
    let caption = `
┌〔 *Gesperrte Chats* 〕
├ Anzahl: ${chats.length} Chat${chats.length > 0 ? '\n' + chats.map(([jid], i) => `
├ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unbekannt' : conn.getName(jid)}
├ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
└────

┌〔 *Global gesperrte Nutzer* 〕
├ Anzahl: ${users.length} Nutzer${users.length > 0 ? '\n' + users.map(([jid], i) => `
├ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unbekannt' : conn.getName(jid)}
├ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
└────

┌〔 *In Gruppen gesperrte Nutzer* 〕
├ Anzahl: ${groupBannedUsers.length} Nutzer${groupBannedUsers.length > 0 ? '\n' + groupBannedUsers.map((data, i) => {
        const remainingTime = data.bannedTime > Date.now() ? 
            Math.ceil((data.bannedTime - Date.now()) / 1000 / 60) : 0 // minutes
        const timeInfo = remainingTime > 0 ? ` (noch ${remainingTime} min)` : ''
        
        return `
├ ${i + 1}. ${conn.getName(data.userId) == undefined ? 'Unbekannt' : conn.getName(data.userId)}
├ Gruppe: ${conn.getName(data.groupId) == undefined ? 'Unbekannt' : conn.getName(data.groupId)}
├ ${isOwner ? '@' + data.userId.split`@`[0] : data.userId}${timeInfo}
`.trim()}).join('\n') : ''}
└────
`.trim()

    // Extract all mentions
    const allMentions = []
    if (isOwner) {
        chats.forEach(([jid]) => {
            if (jid.endsWith('@g.us') || jid.endsWith('@s.whatsapp.net')) {
                allMentions.push(jid)
            }
        })
        
        users.forEach(([jid]) => {
            if (jid.endsWith('@s.whatsapp.net')) {
                allMentions.push(jid)
            }
        })
        
        groupBannedUsers.forEach((data) => {
            if (data.userId.endsWith('@s.whatsapp.net')) {
                allMentions.push(data.userId)
            }
        })
    }
    
    await conn.sendMessage(m.chat, {
        text: caption,
        mentions: allMentions
    }, { quoted: m })
}
handler.help = ['bannedlist', 'banlist', 'gesperrtliste']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|gesperrtliste|sperrliste|banlist$/i
handler.owner = false
module.exports = handler
