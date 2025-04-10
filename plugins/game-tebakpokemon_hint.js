let handler = async (m, { conn }) => {
    conn.tebakpokemon = conn.tebakpokemon ? conn.tebakpokemon : {}
    let id = m.chat
    if (!(id in conn.tebakpokemon)) throw false
    let json = conn.tebakpokemon[id][1]
    m.reply('```' + json.Antwort.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*ANTWORTE AUF DIE FRAGE, NICHT AUF DIESE NACHRICHT!*')
}
handler.command = /^(tebpo|pokemonhilfe|pokemontipp)/i

handler.limit = true

module.exports = handler