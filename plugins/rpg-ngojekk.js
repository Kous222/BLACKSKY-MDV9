let handler = async (m, { conn }) => {
  let __timers = (new Date - global.db.data.users[m.sender].lastngojek)
  let _timers = (300000 - __timers)
  let order = global.db.data.users[m.sender].ojek
  let timers = clockString(_timers) 
  let name = conn.getName(m.sender)
  let user = global.db.data.users[m.sender]
  
  if (new Date - global.db.data.users[m.sender].lastngojek > 300000) {
      user.lastngojek = new Date * 1

      let randomaku1 = `${Math.floor(Math.random() * 10)}`
      let randomaku2 = `${Math.floor(Math.random() * 10)}`
      let randomaku4 = `${Math.floor(Math.random() * 5)}`
      let randomaku3 = `${Math.floor(Math.random() * 10)}`
      let randomaku5 = `${Math.floor(Math.random() * 10)}`

      .trim()

      let rbrb1 = (randomaku1 * 2)
      let rbrb2 = (randomaku2 * 10) 
      let rbrb3 = (randomaku3 * 1)
      let rbrb4 = (randomaku4 * 15729)
      let rbrb5 = (randomaku5 * 200)

      var zero1 = `${rbrb1}`
      var zero2 = `${rbrb2}`
      var zero3 = `${rbrb3}`
      var zero4 = `${rbrb4}`
      var zero5 = `${rbrb5}`

      let arr = [
          `erhalten Orderan...`, 
          `🚶🛵⬛⬛⬛⬛⬛⬛⬛⬛
          ⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
          ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
          🏘️🏘️🏘️🏘️🌳  🌳 🏘️       \n\n\n➕ Mengantar zu tujuan....`, 
          `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
          ⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
          ⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛
          🏘️🏘️🏘️🏘️🌳  🌳 🏘️       \n\n\n➕ Bis in tujuan...`, 
          `➕ 💹Empfangen gaji....`, 
          `*—[ Ergebnis Fahrer ${name} ]—*
          ➕ 💹 Geld = [ ${zero4} ]
          ➕ ✨ Exp = [ ${zero5} ] 		 
          ➕ 😍 Order fertig = +1
          ➕  📥Total Order Zurück : ${order}
          ${wm}`
      ]

      let { key } = await conn.sendMessage(m.chat, {text: 'suchen pelanggan.....'})
      for (let i = 0; i < arr.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          await conn.sendMessage(m.chat, { text: arr[i], bearbeiten: key });
      }

      global.db.data.users[m.sender].Münzen += rbrb4
      global.db.data.users[m.sender].exp += rbrb5
      global.db.data.users[m.sender].ojek += 1

  } else m.reply(`Sepertinya Sie bereits kecapekan bitte Pause früher ungefähr\n*${timers}*`)
}
handler.help = ['ojek']
handler.tags = ['rpg']
handler.command = /^(ojek|Fahrer|gojek)$/i
handler.register = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}