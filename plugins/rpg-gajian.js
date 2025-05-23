let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
	let time = user.lastclaimb2 + 86400000
    if (new Date - user.lastclaimb2 < 86400000) throw `Du hast heute schon dein Gehalt abgeholt\nWarte noch ${msToTime(time - new Date())} bis du es wieder abholen kannst`
	let Münzen = `${Math.floor(Math.random() * 5000000)}`.trim()
	user.Münzen += 50000
	user.lastclaimb2 = new Date * 1
    m.reply(`Du hast 50.000 Money get`)
}
handler.help = ['salary']
handler.tags = ['rpg']
handler.command = /^(salary|gaji|gajian)/i
handler.register = true
handler.rpg = true
module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Std " + minutes + " Min " + seconds + " Sek"
}
