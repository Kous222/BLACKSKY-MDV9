let handler = async (m, { conn }) => {
    conn.merdeka = conn.merdeka ? conn.merdeka : {}
    let id = m.chat
    if (!(id in conn.merdeka)) throw false
    let json = conn.merdeka[id][1]
    let ans = json.Antwort
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt. Großbuchstaben werden in der Regex-Ersetzung benutzt
    let clue = ans.replace(/[BCDFGHJKLMNPQERSVWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.help = ['mka', 'hinweis', 'tipp']
handler.tags = ['spiel']
handler.command = /^(mka|hinweis|tipp)/i
handler.limit = true
module.exports = handler

// Entwickelt von dana_putra13