let handler = async (m, { conn }) => {
    conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {}
    let id = m.chat
    if (!(id in conn.tebaklogo)) throw false
    let json = conn.tebaklogo[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^(lgo|logohilfe|logotipp)/i

handler.limit = true

module.exports = handler