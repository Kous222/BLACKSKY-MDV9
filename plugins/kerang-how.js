let handler = async (m, { conn, command, text }) => {
  if (!text) throw `Siapa Jang *${command.replace('how', '').toUpperCase()}*`
  conn.reply(m.chat, `
${command} *${text}*
*${text}* is *${Math.floor(Math.random() * 101)}*% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {})
}
handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => 'how' + v + ' wer?')
handler.tags = ['kerang']
handler.command = /^how(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
