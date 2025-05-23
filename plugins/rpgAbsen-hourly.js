const free = 5000
const prem = 10000
const Münzenfree = 5000
const Münzenprem = 10000
const timeout = 3600000

let handler = async (m, { conn, isPrems }) => {
    let time = global.db.data.users[m.sender].lasthourly + 3600000
  if (new Date - global.db.data.users[m.sender].lasthourly < 3600000) return conn.reply(m.chat, `Sie bereits mengklaim, klaim täglich Tag dies\ntunggu während ${msToTime(time - new Date())} wieder`, m)
      //  conn.reply(m.chat, `Sie bereits mengklaim und erhalten :`, m)
        global.db.data.users[m.sender].exp += isPrems ? prem : free
        global.db.data.users[m.sender].Münzen += isPrems ? Münzenprem : Münzenfree
       // global.db.data.users[m.sender].potion += 5
        conn.reply(m.chat, `Herzlichen Glückwunsch du erhalten:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? Münzenprem : Münzenfree} Money`, m)
        global.db.data.users[m.sender].lasthourly = new Date * 1
    }
handler.help = ['hourly']
handler.tags = ['rpgabsen']
handler.command = /^(hourly)$/i
handler.Besitzer = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false
handler.rpg = true
handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.Münzen = 0
handler.exp = 0
handler.limit = true

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