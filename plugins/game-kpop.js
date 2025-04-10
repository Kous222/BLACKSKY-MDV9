let timeout = 100000
let poin = 10000
let src
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakkpop = conn.tebakkpop ? conn.tebakkpop : {}
  let id = m.chat
  if (id in conn.tebakkpop) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakkpop[id][0])
    throw false
  }
  if (!src) src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakpop?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Es ist ein error aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _SPIEL RATEN KPOP_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}kpp für einen Hinweis
▢ *ANTWORTE AUF* diese Nachricht, um zu\nantworten
└──────────────

    `.trim()
  conn.tebakkpop[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakkpop[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakkpop
        
        
        [id][0])
      delete conn.tebakkpop[id]
    }, timeout)
  ]
}

handler.help = ['tebakkpop']
handler.tags = ['spiel']
handler.command = /^tebakkpop/i
handler.limit = false
handler.group = true

module.exports = handler