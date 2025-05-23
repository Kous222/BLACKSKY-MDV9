const User = require('../lib/User') // Passe den Pfad ggf. an

let handler = async (m, { conn, isOwner }) => {
    // Gebannte Chats aus local DB
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)

    // Globale gebannte Nutzer aus MongoDB
    let users = await User.find({ banned: true })

    // Gruppenbezogene gebannte Nutzer aus local DB
    let groupBannedUsers = []
    for (const [chatId, chatData] of Object.entries(global.db.data.chats)) {
        if (chatData.memgc) {
            for (const [userId, userData] of Object.entries(chatData.memgc)) {
                if (userData.banned) {
                    groupBannedUsers.push({
                        userId,
                        groupId: chatId,
                        bannedTime: userData.bannedTime || 0
                    })
                }
            }
        }
    }

    // Hilfsfunktion für sichere Namensauflösung
    let getNameSafe = async (jid) => {
        try {
            return await conn.getName(jid)
        } catch {
            return 'Unbekannt'
        }
    }

    let caption = `┌〔 *Gesperrte Chats* 〕
├ Anzahl: ${chats.length}${chats.length > 0 ? '\n' + (await Promise.all(chats.map(async ([jid], i) => {
        let name = await getNameSafe(jid)
        return `├ ${i + 1}. ${name}\n├ ${isOwner && jid ? '@' + jid.split('@')[0] : jid}`
    }))).join('\n') : ''}
└────

┌〔 *Global gesperrte Nutzer* 〕
├ Anzahl: ${users.length}${users.length > 0 ? '\n' + (await Promise.all(users.map(async (user, i) => {
        let name = await getNameSafe(user.jid)
        return `├ ${i + 1}. ${name}\n├ ${isOwner && user.jid ? '@' + user.jid.split('@')[0] : user.jid}`
    }))).join('\n') : ''}
└────

┌〔 *In Gruppen gesperrte Nutzer* 〕
├ Anzahl: ${groupBannedUsers.length}${groupBannedUsers.length > 0 ? '\n' + (await Promise.all(groupBannedUsers.map(async (data, i) => {
        let userName = await getNameSafe(data.userId)
        let groupName = await getNameSafe(data.groupId)
        let remainingTime = data.bannedTime > Date.now() ?
            Math.ceil((data.bannedTime - Date.now()) / 60000) : 0
        let timeInfo = remainingTime > 0 ? ` (noch ${remainingTime} min)` : ''
        return `├ ${i + 1}. ${userName}\n├ Gruppe: ${groupName}\n├ ${isOwner && data.userId ? '@' + data.userId.split('@')[0] : data.userId}${timeInfo}`
    }))).join('\n') : ''}
└────`.trim()

    // Erwähnungen sammeln
    const allMentions = []
    if (isOwner) {
        chats.forEach(([jid]) => allMentions.push(jid))
        users.forEach(user => allMentions.push(user.jid))
        groupBannedUsers.forEach(data => allMentions.push(data.userId))
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
