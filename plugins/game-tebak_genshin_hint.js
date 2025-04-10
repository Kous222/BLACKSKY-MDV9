let handler = async (m, { conn }) => {
    conn.tebakgenshin = conn.tebakgenshin ? conn.tebakgenshin : {}
    let id = m.chat
    if (!(id in conn.tebakgenshin)) throw false
    let json = conn.tebakgenshin[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^gca$/i

handler.limit = true

module.exports = handler
