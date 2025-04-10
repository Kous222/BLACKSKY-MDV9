let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkode = conn.tebakkode ? conn.tebakkode : {}
    let id = m.chat
    if (id in conn.tebakkode) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakkode[id][0])
        throw false
    }
    // in hier er/sie ngambil data von api
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakkode?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // erstellen caption erstellen in tampilin in wa
    let options = json.auswählenan.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')
    let caption = `
${json.FRAGE}

${options}

┌─⊷ *FRAGE*
▢ Sprache: *${json.bahasa}*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}kdo für einen Hinweis
▢ *Balas/ replay FRAGE dies für antworten mit a, b, c, oder d*
└──────────────
`.trim()
    conn.tebakkode[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkode[id]) {
                conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakkode[id][0])
                delete conn.tebakkode[id] // Automatically delete the question
            }
        }, timeout)
    ]
}
handler.help = ['tebakkode']
handler.tags = ['spiel']
handler.command = /^tebakkode/i
handler.register = false
handler.group = true

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133