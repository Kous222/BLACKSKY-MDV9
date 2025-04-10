let timeout = 100000
let poin = 10000
let src
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakgambar[id][0])
    throw false
  }
  if (!src) src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakgambar?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Ein error ist aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _BILDERRÄTSEL SPIEL_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}hint für einen Hinweis
▢ *ANTWORTE* auf diese Nachricht, um zu antworten
└──────────────

    `.trim()
  conn.tebakgambar[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgambar[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakgambar[id][0])
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}

handler.help = ['tebakgambar', 'bildraten', 'bilderraten', 'bilderrätsel', 'bilderrate']
handler.tags = ['spiel']
handler.command = /^(tebakgambar|bildraten|bilderraten)/i
handler.limit = false
handler.group = true

module.exports = handler