let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*gca/i.test(m.quoted.text)) return !0
  this.tebakgenshin = this.tebakgenshin ? this.tebakgenshin : {}
  if (!(id in this.tebakgenshin)) return m.reply('Frage das hat enden')
  if (m.quoted.id == this.tebakgenshin[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tebakgenshin[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakgenshin[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.Münzen += poin
      m.reply(`*Richtig!*\n+${this.tebakgenshin[id][2]} Münzen`)
      clearTimeout(this.tebakgenshin[id][3])
      delete this.tebakgenshin[id]
    } else if ((m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
    else m.reply(`*Falsch!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler
