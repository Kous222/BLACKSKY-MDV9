let fs = require('fs')
let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        if (conn.tekateki[id].length !== 0) return conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tekateki[id][0])
        delete conn.tekateki[id]
        throw false
    }
    conn.tekateki[id] = []
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tekateki?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]

    let caption = `
*RÄTSEL*

${json.data.frage}
┌─⊷ *FRAGE*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Hilfe: ${usedPrefix}ratseltipp
▢ *Antworte auf diese Nachricht, um zu antworten*
└──────────────
`.trim()
conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m),
    json, poin,
    setTimeout(() => {
        if (conn.tekateki[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.data.Antwort}*`, conn.tekateki[id][0])
        delete conn.tekateki[id]
    }, timeout)
]
}
handler.help = ['tekateki', 'rätsel', 'denksport']
handler.tags = ['spiel']
handler.command = /^(tekateki|rätsel|denksport)/i
handler.group = true

module.exports = handler