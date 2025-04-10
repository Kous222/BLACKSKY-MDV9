let handler = async (m, { conn }) => {
    conn.kimia = conn.kimia ? conn.kimia : {}
    let id = m.chat
    if (!(id in conn.kimia)) throw false
    let json = conn.kimia[id][1]
    let ans = json.lambang
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt. Großbuchstaben werden in der Regex-Ersetzung benutzt
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTVWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^kmi/i
handler.limit = true
module.exports = handler

//gh: dana_putra13