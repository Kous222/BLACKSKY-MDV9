let handler = async (m, { command, Text }) => {
  let ter = command[1].toLowerCase()
  let txt = m.quoted ? m.quoted.Text ? m.quoted.Text : Text ? Text : m.Text : Text ? Text : m.Text
  await m.Antworten(txt.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
}
handler.help = [...'aiueo'].map(v => `h${v}l${v}h <Text>`)
handler.tags = ['tools']
handler.command = /^h([aiueo])l\1h/i

module.exports = handler
