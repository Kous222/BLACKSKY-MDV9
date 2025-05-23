let handler = async (m, { conn, text }) => {
    if (!text) throw '• *Beispiel:* .bebaskan @Benutzer'

    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Bitte markiere die Person, die du aus dem Gefängnis befreien möchtest.'

    let users = global.db.data.users

    // Überprüfen, ob der Nutzer, der die Befreiung ausführt, ein Polizist ist
    if (users[m.sender].job !== 'polizist') throw 'Du musst ein Polizist sein, um jemanden zu befreien.'

    users[who].jail = false
    conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key }})
}

handler.help = ['bebaskan']
handler.tags = ['rpg']
handler.command = /^bebaskan$/i
handler.Besitzer = false
handler.admin = false
handler.rpg = true

module.exports = handler
