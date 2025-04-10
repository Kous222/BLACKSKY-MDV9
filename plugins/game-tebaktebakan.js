let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {}
    let id = m.chat
    if (id in conn.tebaktebakan) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebaktebakan[id][0])
        throw false
    }
    // in hier er/sie ngambil data von api
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebaktebakan?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // erstellen caption erstellen in tampilin in wa
    let caption = `
${json.FRAGE}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}tika für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Balas/ replay FRAGE dies für antworten*
└──────────────
`.trim()
    conn.tebaktebakan[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaktebakan[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebaktebakan[id][0])
            delete conn.tebaktebakan[id]
        }, timeout)
    ]
}
handler.help = ['tebaktebakan', 'rätselspaß', 'rätselspiel']
handler.tags = ['spiel']
handler.command = /^(tebaktebakan|rätselspaß|rätselspiel)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133