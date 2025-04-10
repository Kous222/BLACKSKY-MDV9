let handler = async (m, { conn }) => {
    conn.tebakml = conn.tebakml ? conn.tebakml : {}
    let id = m.chat
    if (!(id in conn.tebakml)) throw false
    let json = conn.tebakml[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^(tml|mlhint|heldhint)$/i

handler.limit = true

module.exports = handler