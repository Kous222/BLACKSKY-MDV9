let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Tippe.*logohilfe/i.test(m.quoted.text)) return !0
  this.tebaklogo = this.tebaklogo ? this.tebaklogo : {}
  if (!(id in this.tebaklogo)) return m.reply('Diese Frage ist bereits beendet')
  if (m.quoted.id == this.tebaklogo[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tebaklogo[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.Antwort.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebaklogo[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.Münzen += poin
      m.reply(`*Richtig!*\n+${this.tebaklogo[id][2]} Münzen`)
      clearTimeout(this.tebaklogo[id][3])
      delete this.tebaklogo[id]
    } else if ((m.text.toLowerCase(), json.Antwort.toLowerCase().trim()) >= threshold) m.reply(`*Fast richtig!*`)
    else m.reply(`*Falsch!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler