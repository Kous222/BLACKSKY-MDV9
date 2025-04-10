let timeout = 100000
let poin = 10000
let src
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {}
  let id = m.chat
  if (id in conn.tebaklogo) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebaklogo[id][0])
    throw false
  }
  if (!src) src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebaklogo?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Es ist ein error aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _LOGO RATEN_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}logohilfe für einen Hinweis
▢ *ANTWORTE* auf diese Nachricht,\num zu antworten
└──────────────

    `.trim()
  conn.tebaklogo[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebaklogo[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebaklogo[id][0])
      delete conn.tebaklogo[id]
    }, timeout)
  ]
}

handler.help = ['tebaklogo', 'logoraten', 'logoratespiel']
handler.tags = ['spiel']
handler.command = /^(tebaklogo|logoraten|logoratespiel)/i
handler.limit = false
handler.group = true

module.exports = handler