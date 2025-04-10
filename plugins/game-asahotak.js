let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.gehirntraining = conn.gehirntraining ? conn.gehirntraining : {}
    let id = m.chat
    if (id in conn.gehirntraining) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.gehirntraining[id][0])
        throw false
    }
    // in hier er/sie ngambil data von api
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/gehirntraining?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // erstellen caption erstellen in tampilin in wa
    let caption = `
${json.FRAGE}

┌─⊷ *FRAGE*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}toka oder ${usedPrefix}denkhilfe für Hilfe
▢ Bonus: ${poin} Punkte
▢ *Antworte auf diese Nachricht, um zu antworten*
└──────────────
`.trim()
    conn.gehirntraining[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.gehirntraining[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.gehirntraining[id][0])
            delete conn.gehirntraining[id]
        }, timeout)
    ]
}
handler.help = ['gehirntraining', 'denkrätsel', 'gedächtnisquiz', 'wörterraten', 'denkspiel']
handler.tags = ['spiel']
handler.command = /^(gehirntraining|denkrätsel|gedächtnisquiz)/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133