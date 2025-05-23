let handler = async (m, { conn }) => {
    let __timers = (new Date() - (global.db.data.users[m.sender].lastngewe || 0))
    let _timers = (7200000 - __timers) // 2 jam in miliSekunden
    let timers = _timers >= 0 ? clockString(_timers) : "zeit bereits verbraucht"
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let arbeiten = 'ewe-paksa'
    conn.Mission = conn.Mission ? conn.Mission : {}
    if (id in conn.Mission) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.Mission[id][0]} zuerst vorher`, m)
        throw false
    }
    if (new Date() - user.lastngewe > 7200000 || !user.lastngewe) { // Ubah kondisi cooldown
        let randomaku1 = Math.floor(Math.random() * 1000000)
        let randomaku2 = Math.floor(Math.random() * 10000)
        
        var dimas = `
👙 du paksa
     er/sie buka kleidung🤭
`.trim()

        var dimas2 = `
🥵💦 sszz Ahhhh.....
`.trim()

        var dimas3 = `
🥵Ahhhh, Sakitttt!! >////<
 💦Crotttt.....
  💦Crottt wieder
`.trim()

        var dimas4 = `
🥵💦💦Ahhhhhh😫
`.trim()

        var hsl = `
*—[ Ergebnis Ewe Paksa ${name} ]—*
➤ 💰 Geld = [ ${randomaku1} ]
➤ ✨ Exp = [ ${randomaku2} ]
➤ 😍 Order fertig = +1
`.trim()

        user.Münzen += randomaku1
        user.exp += randomaku2
        
        conn.Mission[id] = [
            arbeiten,
        setTimeout(() => {
            delete conn.Mission[id]
        }, 27000)
        ]
        
        setTimeout(() => {
            m.reply(hsl)
        }, 27000)

        setTimeout(() => {
            m.reply(dimas4)
        }, 25000)

        setTimeout(() => {
            m.reply(dimas3)
        }, 20000)

        setTimeout(() => {
            m.reply(dimas2)
        }, 15000)

        setTimeout(() => {
            m.reply(dimas)
        }, 10000)

        setTimeout(() => {
            m.reply('🤭starten ewe paksa..')
        }, 0)
        
        setTimeout(() => {
            m.reply(`⏳ Zeit für *Ewe-paksa* sefortfahrennya bereits tiba! benutzen *ewe-paksa* jetzt für erhalten mehr viele Belohnung!`)
        }, _timers)
        
        user.lastngewe = new Date() * 1
    } else m.reply(`Bitte Menünggu während ${timers} wieder für durchführen *Ewe-paksa* zurück`)
}

handler.help = ['ewe-paksa @tag']
handler.tags = ['rpg']
handler.command = /^(ewe-paksa)$/i
handler.register = true
handler.group = true
handler.rpg = true
module.exports = handler 

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    let result = []
    if (h > 0) result.push(`${h} jam`)
    if (m > 0) result.push(`${m} menit`)
    if (s > 0) result.push(`${s} Sekunden`)
    if (result.length === 0) result.push('weniger von 1 Sekunden')
    return result.join(' ')
}