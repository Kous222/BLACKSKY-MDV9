const similarity = require('similarity')
const threshold = 0.72
let poin = 10000
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*liga/i.test(m.quoted.text)) return !0
    this.tebaklirik = this.tebaklirik ? this.tebaklirik : {}
    if (!(id in this.tebaklirik)) return m.reply('Die Frage ist bereits beendet')
    if (m.quoted.id == this.tebaklirik[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaklirik[id][1]))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklirik[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.tebaklirik[id][2]} Münzen`)
            clearTimeout(this.tebaklirik[id][3])
            delete this.tebaklirik[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler