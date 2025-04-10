let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe .tdkt/i.test(m.quoted.text)) return !0
  this.tebakdrakor = this.tebakdrakor ? this.tebakdrakor : {}
  if (!(id in this.tebakdrakor)) return m.reply('Frage das hat enden')
  if (m.quoted.id == this.tebakdrakor[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tebakdrakor[id][1]))
    if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakdrakor[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.Münzen += poin
      m.reply(`*Richtig!*\n+${this.tebakdrakor[id][2]} Münzen`)
      clearTimeout(this.tebakdrakor[id][3])
      delete this.tebakdrakor[id]
    } else if ((m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
    else m.reply(`*Falsch!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler