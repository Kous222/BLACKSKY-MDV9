let poin = 10000
const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*tml/i.test(m.quoted.text)) return !0
    this.tebakml = this.tebakml ? this.tebakml : {}
    if (!(id in this.tebakml)) return m.reply('Diese Frage ist bereits beendet')
    if (m.quoted.id == this.tebakml[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakml[id][1]))
        if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakml[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.tebakml[id][2]} Geld`)
            clearTimeout(this.tebakml[id][3])
            delete this.tebakml[id]
        } else if (similarity(m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler