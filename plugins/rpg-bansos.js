let handler = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender]
    let randomaku = Math.floor(Math.random() * 150)
    let randomkamu = Math.floor(Math.random() * 75) //biar sering zu tangkap wkwk
    let __timers = (new Date - user.lastbansos)
    let _timers = (3600000 - __timers) 
    let timers = clockString(_timers)
    if (user.Münzen < 5000000) return m.reply(`Geld Sie Muss Diatas 5Juta für Mengbenutze Command Dies`)
    if (new Date - user.lastbansos > 300000) {
      if (randomaku > randomkamu) {
        conn.sendFile(m.chat, 'https://telegra.ph/file/afcf9a7f4e713591080b5.jpg', 'korupsi.jpg', `du Tertangkap Setelah du korupsi dana bansos🕴️💰,  Und du muss membayar denda 5 Juta rupiah💵`, m)
        user.Münzen -= 5000000
        user.lastbansos = new Date * 1
      } else if (randomaku < randomkamu) {
        user.Münzen += 5000000
        conn.sendFile(m.chat, 'https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg', 'korupsi.jpg', `du erfolgreich  korupsi dana bansos🕴️💰,  Und du erhalten 5 Juta rupiah💵`, m)
        user.lastbansos = new Date * 1
      } else {
        m.reply(`Sorry Gan Lu g erfolgreich Korupsi bansos Und Nein eintreten penjara karna du *melarikan selbst🏃*`)
        user.lastbansos = new Date * 1
      }
    } else m.reply(`Bitte Menünggu ${timers} für ${command} Lagi`)
}

handler.help = ['korupsi']
handler.tags = ['rpg']
handler.command = /^(bansos|korupsi)$/i
handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}