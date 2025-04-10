let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
	let time = user.lastclaimb1 + 86400000
    if (new Date - user.lastclaimb1 < 86400000) throw `du bereits Ambil Bonus Tage Dies\nTunggu während ${msToTime(time - new Date())} wieder`
	let Münzen = `${Math.floor(Math.random() * 5000000)}`.trim()
	user.Münzen += Münzen * 1
	user.lastclaimb1 = new Date * 1
  m.reply(`Herzlichen Glückwunsch du erhalten Bonus : \n+${Münzen} Money`)
}
handler.help = ['Bonus']
handler.tags = ['rpg', 'prem']
handler.command = /^(Bonus)/i
handler.register = true
handler.Premium = true
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

  return hours + " jam " + minutes + " menit " + seconds + " Sekunden"
}