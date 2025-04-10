let fetch = require('node-fetch')

let timeout = 100000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.flaggerate2 = conn.flaggerate2 ? conn.flaggerate2 : {}
    let id = m.chat
    if (id in conn.flaggerate2) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.flaggerate2[id][0])
        throw false
    }
    // Hier werden die Daten von der API abgerufen
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/flaggerate?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Beschriftung erstellen, die in WhatsApp angezeigt wird
    let caption = `
${json.bendera}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}teii für Hilfe
▢ Bonus: ${poin} Sozialpunkte
▢ *Antworte auf diese Frage mit einer Nachricht*
└──────────────
`.trim()
    conn.flaggerate2[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.flaggerate2[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.name}*`, conn.flaggerate2[id][0])
            delete conn.flaggerate2[id]
        }, timeout)
    ]
}
handler.help = ['flaggerate', 'flaggenquiz', 'flaggenraten']
handler.tags = ['spiel']
handler.command = /^(flaggerate|flaggenquiz|flaggenraten)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133