let fetch = require('node-fetch')
let timeout = 100000
let poin = 10000
let handler = async (m, { conn, command, usedPrefix }) => {

    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebaklagu[id][0])
        throw false
    }
    let data = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebaklagu?apikey=${lann}`)).json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `*${command.toUpperCase()}*
Penyanyi: ${json.artis}

┌─⊷ *FRAGE*
▢Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢Tippe *${usedPrefix}lag* für Hilfe
▢Bonus: ${poin} Münzen
▢*Balas/ replay FRAGE dies für antworten*
└──────────────
`.trim()
    conn.tebaklagu[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklagu[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.judul}*`, conn.tebaklagu[id][0])
            delete conn.tebaklagu[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.lagu, 'tebaklagu.mp3', '', conn.tebaklagu[id][0])
   
}
handler.help = ['tebaklagu', 'liedraten', 'musikquiz']
handler.tags = ['spiel']
handler.command = /^(tebaklagu|liedraten|musikquiz)/i
handler.limit = true

module.exports = handler;