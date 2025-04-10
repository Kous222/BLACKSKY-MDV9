let handler = async (m, { conn }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (!(id in conn.tebaklirik)) throw false
    let json = conn.tebaklirik[id][1]
    let ans = json.answer
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt, Vokale bleiben sichtbar
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^liga/i
handler.limit = true
module.exports = handler

//gh: dana_putra13