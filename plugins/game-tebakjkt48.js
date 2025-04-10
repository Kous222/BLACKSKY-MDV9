let timeout = 100000
let poin = 10000
let src
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakjkt = conn.tebakjkt ? conn.tebakjkt : {}
  let id = m.chat
  if (id in conn.tebakjkt) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakjkt[id][0])
    throw false
  }
  if (!src) src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakjkt48?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Es ist ein error aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _BILD ERRATEN_

┌─⊷ *FRAGE*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}jkcu für einen Hinweis
▢ *ANTWORTE AUF* diese Nachricht, um zu\nantworten
└──────────────

    `.trim()
  conn.tebakjkt[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakjkt[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakjkt[id][0])
      delete conn.tebakjkt[id]
    }, timeout)
  ]
}

handler.help = ['tebakjkt']
handler.tags = ['spiel']
handler.command = /^tebakjkt/i
handler.limit = false
handler.group = true

module.exports = handler