let erstellenall = 1
let handler = async (m, { conn, args, usedPrefix, isOwner }) => {
    conn.judi = conn.judi ? conn.judi : {}
    if (m.chat in conn.judi) return conn.reply (m.chat, 'Masih gibt die/der/das durchführen judi hier, warte bis fertig!!', m)
    else conn.judi[m.chat] = true
    try {
    	let __waktutionskh = (new Date - global.db.data.users[m.sender].judilast)
        let _waktutionskh = (5000 - __waktutionskh)
        let waktutionskh = clockString(_waktutionskh)
        if (new Date - global.db.data.users[m.sender].judilast > 5000) {
        global.db.data.users[m.sender].judilast = new Date * 1
        let randomaku = `${Math.floor(Math.random() * 350)}`.trim()
        let randomkamu = `${Math.floor(Math.random() * 50)}`.trim()                //hehe Biar Susah Gewinnen :v
        let ich = (randomaku * 1)
        let du = (randomkamu * 1)
        let count = args[0]
        count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].Münzen / erstellenall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        count = Math.max(1, count)
        if (args.length < 1) return conn.reply(m.chat, '• *Example :* .judi 1000', m)
        if (global.db.data.users[m.sender].Münzen >= count * 1) {
            global.db.data.users[m.sender].Münzen -= count * 1
            if (ich > du) {
                conn.reply(m.chat, `ich roll:${ich}\nKamu roll: ${du}\n\nkamu *Verlieren*, du kehilangan ${count} Münzen`.trim(), m)
            } else if (ich < du) {
                global.db.data.users[m.sender].Münzen += count * 2
                conn.reply(m.chat, `ich roll:${ich}\nKamu roll: ${du}\n\nkamu *Gewinnen*, du erhalten ${count * 2} Münzen`.trim(), m)
            } else {
                global.db.data.users[m.sender].Münzen += count * 1
                conn.reply(m.chat, `ich roll:${ich}\nKamu roll: ${du}\n\nkamu *Unentschieden*, du erhalten ${count * 1} Münzen`.trim(), m)
            }
        } else conn.reply(m.chat, `Money du nicht genug für durchführen judi etwa ${count} Münzen`.trim(), m)
      } else conn.reply(m.chat, `du bereits judi, nicht kann judi zurück..\nBitte warten ${waktutionskh} wieder für judi zurück `, m)
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error!!', m)
   } finally {
        delete conn.judi[m.chat]
    }
 }
handler.help = ['judi']
handler.tags = ['rpg']
handler.command = /^(judi)$/i
handler.group = true
handler.rpg = true

handler.fail = null

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}