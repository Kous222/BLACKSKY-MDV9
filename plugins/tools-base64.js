let handler = async (m, { command, Text }) => {
  let txt = m.quoted ? m.quoted.Text ? m.quoted.Text : Text ? Text : m.Text : m.Text
  if (/^encrypt$/i.test(command)) {
  m.Antworten(Buffer.from(txt, 'utf-8').toString('base64'))
  }
  if (/^decrypt$/i.test(command)) {
  	m.Antworten(Buffer.from(txt, 'base64').toString('utf-8'))
}
}
handler.help = ['encrypt', 'decrypt']
handler.tags = ['tools']
handler.command = /^(encrypt|decrypt)$/i

module.exports = handler
