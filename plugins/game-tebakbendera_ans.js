let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*teii/i.test(m.quoted.text)) return !0
    this.tebakbendera2 = this.tebakbendera2 ? this.tebakbendera2 : {}
    if (!(id in this.tebakbendera2)) return m.reply('Frage das hat enden')
    if (m.quoted.id == this.tebakbendera2[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakbendera2[id][1]))
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakbendera2[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.tebakbendera2[id][2]} Sozialpunkte`)
            clearTimeout(this.tebakbendera2[id][3])
            delete this.tebakbendera2[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler