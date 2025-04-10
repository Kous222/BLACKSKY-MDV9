const timeout = 604800000

let handler = async (m, { conn, usedPrefix, text }) => {
	    let time = global.db.data.users[m.sender].lastmaling + 604800000
  if (new Date - global.db.data.users[m.sender].lastmaling< 604800000) return conn.reply(m.chat, `Sie bereits rauben bank\nTunggu während ${msToTime(time - new Date())} wieder`, m)
	let Münzen = `${Math.floor(Math.random() * 30000)}`.trim()
	let exp = `${Math.floor(Math.random() * 999)}`.trim()
	let kardus = `${Math.floor(Math.random() * 1000)}`.trim()
	global.db.data.users[m.sender].Münzen += Münzen * 1
	global.db.data.users[m.sender].exp += exp * 1
	global.db.data.users[m.sender].kardus += kardus * 1
	global.db.data.users[m.sender].lastmaling = new Date * 1
  conn.reply(m.chat, `Herzlichen Glückwunsch du erhalten : \n+${Münzen} Money\n+${kardus} Kardus\n+${exp} Exp`, m)
}
handler.help = ['maling']
handler.tags = ['rpg']
handler.command = /^(maling)/i
handler.Besitzer = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false

handler.administrator = false
handler.botAdmin = false
handler.rpg = true
handler.fail = null
handler.limit = false
handler.exp = 0
handler.Münzen = 0

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