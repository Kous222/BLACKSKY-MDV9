let poin = 10000
let handler = m => m
handler.before = async function (m) {
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || m.quoted.sender != this.user.jid || !/^Was ist das result von/i.test(m.quoted.text)) return !0
  this.math = this.math ? this.math : {}
  if (!(id in this.math)) return m.reply('Diese Frage ist bereits beendet')
  if (m.quoted.id == this.math[id][0].id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]))
    if (m.text == math.result) {
      global.db.data.users[m.sender].exp += math.Bonus
      clearTimeout(this.math[id][3])
      delete this.math[id]
      users.Münzen += poin
      m.reply(`*Richtige response!*\n+${math.Bonus} Münzen`)
    } else {
      if (--this.math[id][2] == 0) {
        clearTimeout(this.math[id][3])
        delete this.math[id]
        m.reply(`*Keine Versuche mehr!*\nAntwort: *${math.result}*`)
      } else m.reply(`*Falsche response!*\nNoch ${this.math[id][2]} Versuche übrig`)
    }
  }
  return !0
}

module.exports = handler
