let fetch = require('node-fetch')

let timeout = 100000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {}
    let id = m.chat
    if (id in conn.tebakkalimat) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakkalimat[id][0])
        throw false
    }
    // data von der API abrufen
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakkalimat?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Beschriftung für WhatsApp erstellen
    let caption = `
${json.FRAGE}

┌─⊷ *SATZRÄTSEL*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}satzhilfe für Hilfe
▢ Bonus: ${poin} Sozialpunkte
▢ *Antworte auf diese Nachricht, um zu antworten*
└──────────────
`.trim()
    conn.tebakkalimat[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkalimat[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakkalimat[id][0])
            delete conn.tebakkalimat[id]
        }, timeout)
    ]
}
handler.help = ['tebakkalimat', 'satzrätsel', 'wortspiel']
handler.tags = ['spiel']
handler.command = /^(tebakkalimat|satzrätsel|wortspiel)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133