let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.wortrate = conn.wortrate ? conn.wortrate : {}
    let id = m.chat
    if (id in conn.wortrate) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.wortrate[id][0])
        throw false
    }
    // Hier holen wir die Daten von der API
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/wortrate?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Erstellen der Beschriftung zur Anzeige in WhatsApp
    let caption = `
${json.FRAGE}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}worttipp oder ${usedPrefix}worthinweis für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Antworte auf diese Frage mit einer Nachricht*
└──────────────
`.trim()
    conn.wortrate[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.wortrate[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.wortrate[id][0])
            delete conn.wortrate[id]
        }, timeout)
    ]
}
handler.help = ['wortrate', 'worträtsel', 'wortraten']
handler.tags = ['spiel']
handler.command = /^(wortrate|worträtsel|wortraten)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133