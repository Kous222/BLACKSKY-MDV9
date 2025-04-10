const similarity = require('similarity')
const threshold = 0.72
let poin = 10000
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*(toka|denkhilfe)/i.test(m.quoted.text)) return !0
    this.asahotak = this.asahotak ? this.asahotak : {}
    if (!(id in this.asahotak)) return m.reply('Diese Frage ist bereits beendet')
    if (m.quoted.id == this.asahotak[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
        if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.asahotak[id][2]
            users.Münzen += poin
            m.reply(`*Richtig!*\n+${this.asahotak[id][2]} Punkte`)
            clearTimeout(this.asahotak[id][3])
            delete this.asahotak[id]
        } else if (similarity(m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
        else m.reply(`*Falsch!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler