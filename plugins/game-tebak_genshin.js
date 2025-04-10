let timeout = 100000
let poin = 10000
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgenshin = conn.tebakgenshin ? conn.tebakgenshin : {}
  let id = m.chat
  if (id in conn.tebakgenshin) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakgenshin[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebak-genshin?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Es ist ein error aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _SPIEL RATEN GENSHIN_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}gca für einen Hinweis
▢ *ANTWORTE AUF* diese Nachricht, um zu\nantworten
└──────────────

    `.trim()
  conn.tebakgenshin[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgenshin[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakgenshin[id][0])
      delete conn.tebakgenshin[id]
    }, timeout)
  ]
}

handler.help = ['tebakgenshin']
handler.tags = ['spiel']
handler.command = /^tebakgenshin/i
handler.limit = false
handler.group = true

module.exports = handler
