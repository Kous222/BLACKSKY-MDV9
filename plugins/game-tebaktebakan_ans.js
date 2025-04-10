let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*tika/i.test(m.quoted.text)) return !0
    this.tebaktebakan = this.tebaktebakan ? this.tebaktebakan : {}
    if (!(id in this.tebaktebakan)) return m.reply('Frage das hat enden')
    if (m.quoted.id == this.tebaktebakan[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaktebakan[id][1]))
        if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaktebakan[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.tebaktebakan[id][2]} Münzen`)
            clearTimeout(this.tebaktebakan[id][3])
            delete this.tebaktebakan[id]
        } else if (similarity(m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
