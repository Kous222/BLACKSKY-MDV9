let handler = async (m, { 
conn,
usedPrefix
}) => {
    // let user = global.db.data.users[m.sender]
    // let timers1 = (new Date - user.kerjatiga)
    // let _timers = (10 - timers1)
    // let timers = clockString(_timers) 
    
    // if (user.Ausdauer < 20) return m.reply(`Ihre Ausdauer reicht nicht aus, um zu arbeiten\nBitte füllen Sie Ihre Ausdauer mit ${usedPrefix}eat auf`)
    // if (user.kerjatiga > 10800000) return m.reply(`Sie sind noch zu erschöpft zum Arbeiten\nBitte warten Sie ${timers} bevor Sie wieder Taschendiebstahl betreiben`)

    let __timers = (new Date - global.db.data.users[m.sender].kerjatiga)
    let _timers = (9000000 - __timers)
    let order = global.db.data.users[m.sender].ojek
    let timers = clockString(_timers) 
    let user = global.db.data.users[m.sender]
    if (new Date - global.db.data.users[m.sender].kerjatiga > 300000) {
let rndm1 = `${Math.floor(Math.random() * 10)}`
let rndm2 = `${Math.floor(Math.random() * 10)}`
.trim()

let ran1 = (rndm1 * 1000)
let ran2 = (rndm2 * 10) 

let hmsil1 = `${ran1}`
let hmsil2 = `${ran2}`

let jln = `
🚶         🚕

✔️ Ziel anvisieren....
`

let jln2 = `
🚶     🚶

➕ Aktion starten....
`

let jln3 = `
🚶

➕ Stehlen....
`

let jln4 = `
         🚕
         
         
         
🚶

➕ 💹Erfolgreich geflohen....
`

let hsl = `
*—[ Taschendiebstahl-Ergebnis ]—*

 ➕ 💹 Geld = [ ${hmsil1} ]
 ➕ ✨ Erfahrung = [ ${hmsil2} ]                 
 ➕ 📦 Taschendiebstahl abgeschlossen = +1

Und Ihre Ausdauer wurde um -20 verringert
`
user.Münzen += ran1
user.exp += ran2
user.Ausdauer -= 20
user.warn += 1
        
setTimeout(() => {
                     m.reply(`${hsl}`)
                     }, 27000) 
               
                     setTimeout(() => {
                     m.reply(`${jln4}`)
                      }, 25000)
                
                     setTimeout(() => {
                     m.reply(`${jln3}`)
                     }, 20000) 
                        
                     setTimeout(() => {
                     m.reply(`${jln2}`)
                     }, 15000) 
                    
                     setTimeout(() => {
                     m.reply(`${jln}`)
                     }, 10000) 
                     
                     setTimeout(() => {
                     m.reply(`🔍Person suchen.....`)
                     }, 0) 
  user.kerjatiga = new Date * 1
                    }
                    else m.reply(`Es scheint, dass Sie bereits erschöpft sind. Bitte machen Sie eine Pause für ungefähr\n*${timers}*`)
}
handler.help = ['taschendiebstahl', 'stehlen', 'pickpocket']
handler.tags = ['rpg']
handler.command = /^(taschendiebstahl|stehlen|pickpocket)$/i
handler.group = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Tage ☀️*\n ', h, ' *Stunden 🕐*\n ', m, ' *Minuten ⏰*\n ', s, ' *Sekunden ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}