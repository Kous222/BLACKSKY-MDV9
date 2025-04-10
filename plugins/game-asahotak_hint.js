let handler = async (m, { conn }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (!(id in conn.asahotak)) throw false
    let json = conn.asahotak[id][1]
    let ans = json.Antwort
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt, nur Vokale bleiben sichtbar
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^(toka|denkhilfe|hint)/i
handler.limit = true
module.exports = handler

//gh: dana_putra13