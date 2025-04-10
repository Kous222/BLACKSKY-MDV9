let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lasttaxi)
    let _timers = (3600000 - __timers)
    let order = global.db.data.users[m.sender].taxi
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let arbeiten = 'taxi'
    conn.Mission = conn.Mission ? conn.Mission : {}
    if (id in conn.Mission) {
        conn.reply(m.chat, `Selesaikan orderan taxi du ${conn.Mission[id][0]} zuerst vorher`, m)
        throw false
    }
    if (new Date - user.lasttaxi > 3600000) {
        let randomaku1 = Math.floor(Math.random() * 1000000)
        let randomaku2 = Math.floor(Math.random() * 10000)
        
        var njir = `
🚶⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️       🚕


✔️ erhalten orderan....
`.trim()

        var njirr = `
🚶⬛⬛⬛⬛⬛🚐⬛⬛⬛🚓🚚
🚖⬜⬜⬜⬛⬜⬜⬜🚓⬛🚑
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛🚙
🏘️🏘️🏢️🌳  🌳 🏘️  🏘️🏡


🚖 Fahrt zu tujuan.....
`.trim()

        var njirrr = `
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛🚓
⬛⬜🚗⬜⬜⬛⬜🚐⬜⬜⬛🚙🚚🚑
⬛⬛⬛⬛🚒⬛⬛⬛⬛⬛⬛🚚
🏘️🏘️🏘️🏘️🌳  🌳 🏘️


🚖 fertig Mengantar Pelanggan....
`.trim()

        var njirrrr = `
➕ 💹Empfangen gaji....
`.trim()

        var Ergebnis = `
*—[ Ergebnis taxi ${name} ]—*
➕ 💹 Geld = [ ${randomaku1} ]
➕ ✨ Exp = [ ${randomaku2} ]
➕ 😍 Order fertig = +1
➕ 📥Total Order Zurück : ${order}
`.trim()

        user.Münzen += randomaku1
        user.exp += randomaku2
        user.taxi += 1
        
        conn.Mission[id] = [
            arbeiten,
        setTimeout(() => {
            delete conn.Mission[id]
        }, 27000)
        ]
        
        setTimeout(() => {
            m.reply(Ergebnis)
        }, 27000)

        setTimeout(() => {
            m.reply(njirrrr)
        }, 25000)

        setTimeout(() => {
            m.reply(njirrr)
        }, 20000)

        setTimeout(() => {
            m.reply(njirr)
        }, 15000)

        setTimeout(() => {
            m.reply(njir)
        }, 10000)

        setTimeout(() => {
            m.reply('🔍suchen orderan erstellen du.....')
        }, 0)
        user.lasttaxi = new Date * 1
    } else m.reply(`du kecapean, Pause früher während ${timers}, neu gas ngorder wieder`)
}
handler.help = ['taxi']
handler.tags = ['rpg']
handler.command = /^(taxi)$/i
handler.register = true
handler.group = true
handler.rpg = true
module.exports = handler;


function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}