let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.susun = conn.susun ? conn.susun : {}
    let id = m.chat
    if (id in conn.susun) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.susun[id][0])
        throw false
    }
    // in hier er/sie ngambil data von api
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/wortzusammensetzen?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // erstellen caption erstellen in tampilin in wa
    let caption = `
${json.FRAGE}

┌─⊷ *FRAGE*
▢ Tipe: ${json.tipe}
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}susn für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Balas/ replay FRAGE dies für antworten*
└──────────────
`.trim()
    conn.susun[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.susun[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.susun[id][0])
            delete conn.susun[id]
        }, timeout)
    ]
}
handler.help = ['wortzusammensetzen', 'wortpuzzle', 'wortreihenfolge']
handler.tags = ['spiel']
handler.command = /^(wortzusammensetzen|wortpuzzle|wortreihenfolge)/i
handler.register = false
handler.group = false

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133