let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.siapakahaku[id][0])
        throw false
    }
    // data von der API abrufen
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/siapakahaku?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Beschriftung für WhatsApp erstellen
    let caption = `
${json.FRAGE}

┌─⊷ *WER BIN ICH*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}werich für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Antworte auf diese Nachricht, um zu antworten*
└──────────────
`.trim()
    conn.siapakahaku[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku', 'werbinich', 'identitätsrätsel']
handler.tags = ['spiel']
handler.command = /^(siapakahaku|werbinich|identitätsrätsel)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133