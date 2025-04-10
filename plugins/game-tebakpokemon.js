let timeout = 100000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakpokemon = conn.tebakpokemon ? conn.tebakpokemon : {}
  let id = m.chat
  if (id in conn.tebakpokemon) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakpokemon[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/tebakpokemon?apikey=${lann}`)).json()
  let json = src[Math.floor(Math.random() * src.length)]
  if (!json) throw "Es ist ein error aufgetreten, bitte versuche den Befehl erneut!"
  let caption = `
≡ _POKEMON RATEN_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}tebpo für einen Hinweis
▢ *ANTWORTE AUF* diese Nachricht, um zu\nantworten
└──────────────

    `.trim()
  conn.tebakpokemon[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakpokemon[id]) conn.reply(m.chat, `Zeit abgelaufen!\nDie response ist *${json.Antwort}*`, conn.tebakpokemon[id][0])
      delete conn.tebakpokemon[id]
    }, timeout)
  ]
}

handler.help = ['tebakpokemon', 'pokemonraten', 'pokemonquiz']
handler.tags = ['spiel']
handler.command = /^(tebakpokemon|pokemonraten|pokemonquiz)/i
handler.limit = false
handler.group = true

module.exports = handler