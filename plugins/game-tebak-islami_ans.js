let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*tsa/i.test(m.quoted.text)) return !0
    this.tebakislami = this.tebakislami ? this.tebakislami : {}
    if (!(id in this.tebakislami)) return m.reply('Frage das hat enden')
    if (m.quoted.id == this.tebakislami[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakislami[id][1]))
        let answerIndex = ['a', 'b', 'c', 'd'].indexOf(m.text.toLowerCase())
        if (json.auswählenan[answerIndex] && json.auswählenan[answerIndex].toLowerCase() == json.Antwort.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakislami[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.tebakislami[id][2]} Münzen\n\n${json.deskripsi}`)
            clearTimeout(this.tebakislami[id][3])
            delete this.tebakislami[id]
        } else if (similarity(json.auswählenan[answerIndex].toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
