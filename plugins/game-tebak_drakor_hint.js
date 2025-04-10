let handler = async (m, { conn }) => {
    conn.tebakdrakor = conn.tebakdrakor ? conn.tebakdrakor : {}
    let id = m.chat
    if (!(id in conn.tebakdrakor)) throw false
    let json = conn.tebakdrakor[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^tdkt$/i

handler.limit = true

module.exports = handler