let handler = async (m, { conn }) => {
    conn.tebakkode = conn.tebakkode ? conn.tebakkode : {}
    let id = m.chat
    if (!(id in conn.tebakkode)) throw false
    let json = conn.tebakkode[id][1]
    let ans = json.Antwort
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten und Zahlen angezeigt, nur Vokale bleiben sichtbar
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^kdo/i
handler.limit = true
module.exports = handler

//gh: dana_putra13