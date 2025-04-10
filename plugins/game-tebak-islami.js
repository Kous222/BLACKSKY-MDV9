let fs = require('fs')
let path = require('path')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakislami = conn.tebakislami ? conn.tebakislami : {}
    let id = m.chat
    if (id in conn.tebakislami) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakislami[id][0])
        throw false
    }
    // in hier er/sie ngambil data von file JSON
    let data = await (await fetch(`https://api.betabotz.eu.org/api/spiel/kuisislami?apikey=${lann}`)).json()
    let json = data[Math.floor(Math.random() * data.length)]
    // erstellen caption erstellen in tampilin in wa
    let options = json.auswählenan.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')
    let caption = `
${json.FRAGE}

${options}

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}tsa für einen Hinweis
▢ *Balas/ replay FRAGE dies für antworten mit a, b, c, oder d*
└──────────────
`.trim()
    conn.tebakislami[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakislami[id]) {
                conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakislami[id][0])
                delete conn.tebakislami[id] // Automatically delete the question
            }
        }, timeout)
    ]
}
handler.help = ['tebakislami']
handler.tags = ['spiel']
handler.command = /^tebakislami/i
handler.register = false
handler.group = true

module.exports = handler
