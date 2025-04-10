let handler = async (m, { conn }) => {
    conn.wortrate = conn.wortrate ? conn.wortrate : {}
    let id = m.chat
    if (!(id in conn.wortrate)) throw false
    let json = conn.wortrate[id][1]
    let ans = json.Antwort
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt. Großbuchstaben werden in der Regex-Ersetzung benutzt
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTFWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.help = ['wort', 'worthinweis', 'worttipp', 'worthinweis']
handler.tags = ['spiel']
handler.command = /^(Wort|worthinweis|worttipp)/i
handler.limit = true
module.exports = handler

// Entwickelt von dana_putra13