let handler = async (m, { conn }) => {
    conn.tebakbendera2 = conn.tebakbendera2 ? conn.tebakbendera2 : {}
    let id = m.chat
    if (!(id in conn.tebakbendera2)) throw false
    let json = conn.tebakbendera2[id][1]
    let ans = json.name
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt, nur Vokale bleiben sichtbar
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^teii/i
handler.limit = true
module.exports = handler

//gh: dana_putra13