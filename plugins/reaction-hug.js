let handler = async (m, { conn, text, participants }) => {
    // if keine Erwähnung gemacht wird, gibt es eine errormeldung
    if (!m.mentionedJid[0]) {
        throw 'Bitte erwähne jemanden, den du umarmen möchtest.'
    }

    // Der Absender ist der, der den Befehl verwendet
    let target = m.mentionedJid[0]
    let sender = m.sender

    // Verwende ein Online-GIF, um sicherzustellen, dass es funktioniert und animiert ist
    let gifUrl = 'https://medien.giphy.com/medien/od5H3PmVtDk1a/giphy.gif'  // Hochwertiges, animiertes Umarmungs-GIF

    // create Sie die Nachricht, wobei der Absender umarmt
    let message = `*@${sender.split('@')[0]} umarmt @${target.split('@')[0]}!*`

    // Senden Sie das GIF als response mit der richtigen Erwähnung
    await conn.sendMessage(m.chat, { 
        Video: { url: gifUrl }, 
        caption: message, 
        gifPlayback: true,
        contextInfo: {
            mentionedJid: [target, sender]  // Beide werden erwähnt
        }
    })
}

handler.help = ['hug @user']
handler.tags = ['reaktion']
handler.command = /^(hug)$/i

handler.group = true

module.exports = handler
