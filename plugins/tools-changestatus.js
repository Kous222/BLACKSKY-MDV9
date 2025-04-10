let handler = async (m, { conn, usedPrefix, command, args }) => {
  let user = global.db.data.users[m.sender]
  
  // Check if the user provided a valid status
  let status = (args[0] || '').toLowerCase()
  
  if (!status) {
    return m.reply(`
Bitte geben Sie einen Status an: 
- 'single' für Single
- 'vergeben' für Vergeben
  `.trim())
  }
  
  if (status !== 'single' && status !== 'vergeben') {
    return m.reply(`
Ungültiger Status! Bitte verwenden Sie 'single' oder 'vergeben'.
  `.trim())
  }

  // Change the user's relationship status
  user.status = status === 'single' ? 'Single' : 'Vergeben'

  m.reply(`Ihr Status wurde erfolgreich auf *${user.status}* gesetzt.`)
}

handler.help = ['changestatus']
handler.tags = ['info']
handler.command = /^changestatus$/i

module.exports = handler
