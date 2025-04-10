let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*(worttipp|worthinweis)/i.test(m.quoted.text)) return !0
    this.wortrate = this.wortrate ? this.wortrate : {}
    if (!(id in this.wortrate)) return m.reply('Die Fragerunde ist beendet')
    if (m.quoted.id == this.wortrate[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.wortrate[id][1]))
        if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.wortrate[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.wortrate[id][2]} Münzen`)
            clearTimeout(this.wortrate[id][3])
            delete this.wortrate[id]
        } else if (similarity(m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler