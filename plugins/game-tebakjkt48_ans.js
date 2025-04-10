let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*jkcu/i.test(m.quoted.text)) return !0
  this.tebakjkt = this.tebakjkt ? this.tebakjkt : {}
  if (!(id in this.tebakjkt)) return m.reply('Frage das hat enden')
  if (m.quoted.id == this.tebakjkt[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tebakjkt[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakjkt[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.Münzen += poin
      m.reply(`*Richtig!*\n+${this.tebakjkt[id][2]} Münzen`)
      clearTimeout(this.tebakjkt[id][3])
      delete this.tebakjkt[id]
    } else if ((m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
    else m.reply(`*Falsch!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler