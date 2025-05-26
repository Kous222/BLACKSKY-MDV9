let handler = async (m, { conn, participants, groupMetadata, text }) => {

    const getGroupAdmins = (participants) => {
        let admins = []
        for (let i of participants) {
            i.isAdmin ? admins.push(i.jid) : ''
        }
        return admins
    }

    let pp = 'https://telegra.ph/file/3c1ea5866a11088685413.jpg'
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) { }

    let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, expired, descUpdate, Sticker } = global.db.data.chats[m.chat]
    const groupAdmins = getGroupAdmins(participants)
    let listAdmin = groupAdmins.map((v, i) => `👑 ${i + 1}. @${v.split('@')[0]}`).join('\n')

    if (text) return m.reply(`🕰️ *Verbleibende Zeit bis Ablauf:*\n${msToDate(expired - new Date())}`)

    let caption = `
💬 *📢 Gruppeninfo für ${groupMetadata.subject}*

📌 *ID:* ${groupMetadata.id}
📝 *Beschreibung:* ${groupMetadata.desc || 'Keine Beschreibung'}
👥 *Mitglieder:* ${participants.length}
👑 *Ersteller:* @${m.chat.split('-')[0]}
🔐 *Admins:*\n${listAdmin}

🛠️ *Bot-Einstellungen:*
🔗 Anti-Link: ${antiLink ? '✅ Aktiviert' : '❌ Deaktiviert'}
❌ Anti-Delete: ${global.db.data.chats[m.chat].delete ? '❌ Deaktiviert' : '✅ Aktiviert'}
🚫 Gebannt: ${isBanned ? '✅ Ja' : '❌ Nein'}
📝 Beschreibung-Update: ${descUpdate ? '✅ Aktiviert' : '❌ Deaktiviert'}
🕵️‍♂️ Erkennung: ${detect ? '✅ Aktiviert' : '❌ Deaktiviert'}
🎨 Sticker: ${Sticker ? '✅ Aktiviert' : '❌ Deaktiviert'}
👋 Willkommen: ${welcome ? '✅ Aktiviert' : '❌ Deaktiviert'}

💬 *Nachrichten:*
👋 Willkommen: ${sWelcome || 'Keine Nachricht eingestellt'}
👋 Abschied: ${sBye || 'Keine Nachricht eingestellt'}
📈 Beförderung: ${sPromote || 'Keine Nachricht eingestellt'}
📉 Herabstufung: ${sDemote || 'Keine Nachricht eingestellt'}

⏳ *Bot bleibt noch für:* ${msToDate(expired - new Date())}
`.trim()

    let mentionedJid = groupAdmins.concat([`${m.chat.split('-')[0]}@s.whatsapp.net`])
    conn.sendFile(m.chat, pp, 'pp.jpg', caption, m, 0, { contextInfo: { mentionedJid } })
}

handler.help = ['infogruppe']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i
handler.group = true
module.exports = handler

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000))
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    return `${days} Tage, ${hours} Stunden, ${minutes} Minuten`
}
