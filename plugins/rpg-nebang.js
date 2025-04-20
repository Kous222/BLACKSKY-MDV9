const timeout = 28800000 // 8 Stunden

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let time = user.lastnebang + timeout

  if (new Date - user.lastnebang < timeout) {
    let restzeit = msToTime(time - new Date())
    throw `⏳ Du hast heute schon Holz gehackt.\n\nBitte warte *${restzeit}*, bevor du erneut Holz hacken kannst.`
  }

  let kayu = Math.floor(Math.random() * 45)
  user.kayu = (user.kayu || 0) + kayu
  user.lastnebang = new Date * 1

  conn.reply(m.chat, `🪓 Du hast erfolgreich Holz gehackt!\n\n🌲 Erhaltenes Holz: *+${kayu} Stück*`, m)
}

handler.help = ['chop']
handler.tags = ['rpg']
handler.command = /^(chop)$/i
handler.group = true
handler.rpg = true
handler.fail = null
handler.limit = true
handler.exp = 0
handler.Münzen = 0

module.exports = handler

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  return `${hours} Std. ${minutes} Min. ${seconds} Sek.`
}
