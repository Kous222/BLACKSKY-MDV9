const timeout = 28800000

let handler = async (m, { conn, usedPrefix, text }) => {
            let time = global.db.data.users[m.sender].lastturu + 28800000
  if (new Date - global.db.data.users[m.sender].lastturu< 28800000) throw `Du sammelst bereits Abfall\nBitte warte ${msToTime(time - new Date())} bevor du wieder sammeln kannst`
    let botolnye = `${Math.floor(Math.random() * 1000)}`.trim()
        let kalengnye = `${Math.floor(Math.random() * 1000)}`.trim()
        let kardusnye = `${Math.floor(Math.random() * 1000)}`.trim()
        global.db.data.users[m.sender].botol += botolnye * 1
        global.db.data.users[m.sender].kaleng += kalengnye * 1
        global.db.data.users[m.sender].kardus += kardusnye * 1
        global.db.data.users[m.sender].lastturu = new Date * 1
  conn.reply(m.chat, `Herzlichen Glückwunsch! Du hast gesammelt: \n+${botolnye} Flaschen\n+${kardusnye} Kartons\n+${kalengnye} Dosen`, m)
}
handler.help = ['mulung', 'sammeln', 'scavenge', 'recycling']
handler.tags = ['rpg']
handler.command = /^(mulung|sammeln|scavenge|recycling)/i
handler.group = true

handler.fail = null
handler.limit = true
handler.exp = 0
handler.Münzen = 0
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

  return hours + " Stunden " + minutes + " Minuten " + seconds + " Sekunden"
}