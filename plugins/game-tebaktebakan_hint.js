let handler = async (m, { conn }) => {
    conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {}
    let id = m.chat
    if (!(id in conn.tebaktebakan)) throw false
    let json = conn.tebaktebakan[id][1]
    let ans = json.Antwort
    // Falls ein Fehler auftritt, wird ein Hinweis mit Unterstrichen (_) für Konsonanten angezeigt, sowohl für Groß- als auch Kleinbuchstaben. Nur Vokale bleiben sichtbar
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTFWXYZbcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tika/i
handler.limit = true
module.exports = handler

//gh: dana_putra13