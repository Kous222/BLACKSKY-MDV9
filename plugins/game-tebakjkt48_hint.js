let handler = async (m, { conn }) => {
    conn.tebakjkt = conn.tebakjkt ? conn.tebakjkt : {}
    let id = m.chat
    if (!(id in conn.tebakjkt)) throw false
    let json = conn.tebakjkt[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^jkcu$/i

handler.limit = true

module.exports = handler