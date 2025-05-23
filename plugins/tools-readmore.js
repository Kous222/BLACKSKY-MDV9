let handler = async (m, { conn, Text }) => {
  let [ l, r ] = Text.split`|`
  if (!l) l = ''
  if (!r) r = ''
  conn.Antworten(m.chat, l + readMore + r, m)
}
handler.help = ['readmore'].map(v => v + ' <Text>|<Text>')
handler.tags = ['tools']
handler.command = /^(spoiler|hidetext|readmore|selengkapnya)$/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
