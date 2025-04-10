const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*tbk/i.test(m.quoted.text)) return !0
    this.tebakjenaka = this.tebakjenaka ? this.tebakjenaka : {}
    if (!(id in this.tebakjenaka)) return m.reply('Frage das hat enden')
    if (m.quoted.id == this.tebakjenaka[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakjenaka[id][1]))
        if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakjenaka[id][2]
            m.reply(`*Richtig!*\n+${this.tebakjenaka[id][2]} Sozialpunkte`)
            clearTimeout(this.tebakjenaka[id][3])
            delete this.tebakjenaka[id]
        } else if (similarity(m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler