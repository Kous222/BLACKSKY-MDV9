let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (id in conn.tebaklirik) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebaklirik[id][0])
        throw false
    }
    // Hier wird die Daten von der API abgerufen
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebaklirik?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Erstellt die Beschriftung, die in WhatsApp angezeigt wird
    let caption = `
${json.question}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}liga für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Antworte auf diese FRAGE, um zu antworten*
└──────────────
`.trim()
    conn.tebaklirik[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklirik[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.answer}*`, conn.tebaklirik[id][0])
            delete conn.tebaklirik[id]
        }, timeout)
    ]
}
handler.help = ['tebaklirik', 'liedtextraten', 'lyrikerraten']
handler.tags = ['spiel']
handler.command = /^(tebaklirik|liedtextraten|lyrikerraten)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133