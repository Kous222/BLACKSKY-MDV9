let handler = async (m, { conn }) => {
    conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {}
    let id = m.chat
    if (!(id in conn.tebakkalimat)) throw false
    let json = conn.tebakkalimat[id][1]
    let ans = json.Antwort
    // if dieser Hinweis error verursacht, ändere die Function unten, um nur Kleinbuchstaben zu verwenden
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^(tela|satzhilfe|wortspielhilfe)/i
handler.limit = true
module.exports = handler

//gh: dana_putra13