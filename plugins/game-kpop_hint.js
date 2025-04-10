let handler = async (m, { conn }) => {
    conn.tebakkpop = conn.tebakkpop ? conn.tebakkpop : {}
    let id = m.chat
    if (!(id in conn.tebakkpop)) throw false
    let json = conn.tebakkpop[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^kpp$/i

handler.limit = true

module.exports = handler