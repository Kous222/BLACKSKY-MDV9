let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.merdeka = conn.merdeka ? conn.merdeka : {}
    let id = m.chat
    if (id in conn.merdeka) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.merdeka[id][0])
        throw false
    }
    // Hier holen wir die Daten von der API
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/kuismerdeka?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Erstellen der Beschriftung zur Anzeige in WhatsApp
    let caption = `
${json.FRAGE}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}hinweis oder ${usedPrefix}tipp für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Antworte auf diese Frage mit einer Nachricht*
└──────────────
`.trim()
    conn.merdeka[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.merdeka[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.merdeka[id][0])
            delete conn.merdeka[id]
        }, timeout)
    ]
}
handler.help = ['kuismerdeka', 'unabhängigkeitsquiz', 'geschichtsquiz']
handler.tags = ['spiel']
handler.command = /^(kuismerdeka|unabhängigkeitsquiz|geschichtsquiz)/i
handler.register = false
handler.group = true

module.exports = handler

// Getestet mit baileys Version 6.7.9 und sharp Version 0.30.5
// Entwickelt von danaputra133