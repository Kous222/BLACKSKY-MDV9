let timeout = 100000
let poin = 1000
let src
let fetch = require ('node-fetch');
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakml = conn.tebakml ? conn.tebakml : {}
  let id = m.chat
  if (id in conn.tebakml) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakml[id][0])
    throw false
  }
  if (!src) src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakheroml?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Ein error ist aufgetreten, bitte versuche es noch einmal!"
  let caption = `
≡ _MOBILE LEGENDS HELD RATEN_

┌─⊷ *FRAGE*
▢ Beschreibung: *${json.deskripsi}*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Geld
▢ Tippe ${usedPrefix}tml für einen Hinweis
▢ *ANTWORTE* auf diese Nachricht, um zu antworten
└──────────────

    `.trim()
  conn.tebakml[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.fullimg }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakml[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakml[id][0])
      delete conn.tebakml[id]
    }, timeout)
  ]
}

handler.help = ['tebakml', 'mlheld', 'heldraten']
handler.tags = ['spiel']
handler.command = /^(tebakml|mlheld|heldraten)/i
handler.limit = false
handler.group = true

module.exports = handler