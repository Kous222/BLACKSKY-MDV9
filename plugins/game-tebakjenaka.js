let fetch = require('node-fetch')

let timeout = 100000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.witzrate = conn.witzrate ? conn.witzrate : {}
    let id = m.chat
    if (id in conn.witzrate) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.witzrate[id][0])
        throw false
    }
    // in hier er/sie ngambil data von api
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/witzrate?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // erstellen caption erstellen in tampilin in wa
    let caption = `
${json.frage}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}tbk für Hilfe
▢ Bonus: ${poin} Sozialpunkte
▢ *Balas/ replay FRAGE dies für antworten*
└──────────────
`.trim()
    conn.witzrate[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.witzrate[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.witzrate[id][0])
            delete conn.witzrate[id]
        }, timeout)
    ]
}
handler.help = ['witzrate']
handler.tags = ['spiel']
handler.command = /^witzrate/i
handler.register = false
handler.group = false

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133