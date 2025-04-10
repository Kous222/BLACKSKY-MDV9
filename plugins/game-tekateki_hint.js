let handler = async (m, { conn }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (!(id in conn.tekateki)) throw false
    let json = conn.tekateki[id][1]
    let ans = json.data.Antwort.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\nAntworte auf die Frage, nicht auf diese Nachricht', conn.tekateki[id][0])
}
handler.command = /^(tete|ratseltipp|rätselhilfe|raetselhilfe)$/i
handler.limit = true
module.exports = handler