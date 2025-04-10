let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.kimia = conn.kimia ? conn.kimia : {}
    let id = m.chat
    if (id in conn.kimia) {
        conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.kimia[id][0])
        throw false
    }
    // in hier er/sie ngambil data von api
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/chemieelementrate?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // erstellen caption erstellen in tampilin in wa
    let caption = `
*${json.name}*

┌─⊷ *FRAGE*
▢ Was rumus kimia von zat kimia/ senyawa in oben?
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Tippe ${usedPrefix}kmi für Hilfe
▢ Bonus: ${poin} Münzen
▢ *Balas/ replay FRAGE dies für antworten*
└──────────────
`.trim()
    conn.kimia[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.kimia[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.lambang}*`, conn.kimia[id][0])
            delete conn.kimia[id]
        }, timeout)
    ]
}
handler.help = ['chemieelementrate', 'chemieraten', 'chemieelemente']
handler.tags = ['spiel']
handler.command = /^(chemieelementrate|chemieraten|chemieelemente)/i
handler.register = false
handler.group = false

module.exports = handler

// getestet mit baileys Version 6.5.0 und sharp Version 0.30.5
// danaputra133