let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `Harap eingeben Text!\n\ncontoh:\n${usedPrefix + command} Haruno`
    conn.Antworten(m.chat, Text, null)
}
handler.help = ['say <Text>']
handler.tags = ['tools']
handler.command = /^(say)$/i

module.exports = handler