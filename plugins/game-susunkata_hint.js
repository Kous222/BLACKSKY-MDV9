let handler = async (m, { conn }) => {
    conn.susun = conn.susun ? conn.susun : {}
    let id = m.chat
    if (!(id in conn.susun)) throw false
    let json = conn.susun[id][1]
    let ans = json.Antwort
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Vokale angezeigt. Vokale werden in der Regex-Ersetzung benutzt
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^susn/i
handler.limit = true
module.exports = handler

//gh: dana_putra13