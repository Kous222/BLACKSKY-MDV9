let timeout = 100000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakmakanan = conn.tebakmakanan ? conn.tebakmakanan : {}
  let id = m.chat
  if (id in conn.tebakmakanan) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakmakanan[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakmakanan?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Es ist ein error aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _SPIEL RATEN MAKANAN_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}tebma für einen Hinweis
▢ *ANTWORTE AUF* diese Nachricht, um zu\nantworten
└──────────────

    `.trim()
  conn.tebakmakanan[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakmakanan[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakmakanan[id][0])
      delete conn.tebakmakanan[id]
    }, timeout)
  ]
}

handler.help = ['tebakmakanan']
handler.tags = ['spiel']
handler.command = /^tebakmakanan/i
handler.limit = false
handler.group = true

module.exports = handler