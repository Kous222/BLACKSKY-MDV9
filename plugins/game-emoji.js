let fetch = require('node-fetch')

let timeout = 100000
let poin = 1000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {}
    let id = m.chat
    if (id in conn.tebakemoji) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakemoji[id][0])
        throw false
    }
    // data von der API abrufen
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakemoji?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // Beschriftung für WhatsApp erstellen
    let caption = `
    *EMOJI RATEN*
Emoji: ${json.emoticon} 

┌─⊷ *FRAGE*
▢ ${json.FRAGE}
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}emojihilfe für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Antworte auf diese Nachricht, um zu antworten*
└──────────────
`.trim()
    conn.tebakemoji[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakemoji[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*\n\nBeschreibung: ${json.deskripsi}`, conn.tebakemoji[id][0])
            delete conn.tebakemoji[id]
        }, timeout)
    ]
}
handler.help = ['tebakemoji', 'emojiraten', 'emojiquiz']
handler.tags = ['spiel']
handler.command = /^(tebakemoji|emojiraten|emojiquiz)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133