let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastdate)
    let _timers = (300000 - __timers)
    let order = global.db.data.users[m.sender].dates
    let timers = clockString(_timers) 
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
     if (new Date - global.db.data.users[m.sender].lastdate > 300000) {
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
        let rbrb5 = (randomaku5 * 20000)

        var zero1 = `${rbrb1}`
        var zero2 = `${rbrb2}`
        var zero3 = `${rbrb3}`
        var zero4 = `${rbrb4}`
        var zero5 = `${rbrb5}`

        let arr = [
        "✔️ Jemanden kennengelernt...",
        "💕 Das Date beginnt...",
        `💕 Die Stimmung wird romantisch...`,
        "💕 Ein wunderschöner Abend...",
        `*—[ Date-Ergebnisse von ${name} ]—*
        ➕ 💹 Geld = [ ${zero4} ]
        ➕ ✨ Erfahrung = [ ${zero5} ] 
        ➕ 📛 Warnung = +1            
        ➕ 😍 Date abgeschlossen = +1
        ➕ 📥 Bisherige Dates insgesamt: ${order}`,
        ]

        let { key } = await conn.sendMessage(m.chat, {text: '🔍Suche nach potenziellen Partnern...'})
        for (let i = 0; i < arr.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          await conn.sendMessage(m.chat, { text: arr[i], bearbeiten: key });
        }

        global.db.data.users[m.sender].warn += 1
        global.db.data.users[m.sender].Münzen += rbrb4
        global.db.data.users[m.sender].exp += rbrb5
        global.db.data.users[m.sender].dates += 1


        user.lastdate = new Date * 1
    } else m.reply(`Sie waren bereits auf einem Date.\nBitte warten Sie ${timers}, bevor Sie ein weiteres Date beginnen können.`)
}
handler.help = ['date', 'dating', 'verabredung']
handler.tags = ['rpg']
handler.command = /^(date|dating|verabredung)$/i
handler.register = true
handler.Premium = false
handler.rpg = true
module.exports = handler


function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return `${h} Stunden, ${m} Minuten, ${s} Sekunden`
}