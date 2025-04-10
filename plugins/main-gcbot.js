let handler = async (m, { conn }) => {
conn.reply(m.chat, gc, m) 
}
handler.help = ['gcbot']
handler.tags = ['spielen']
handler.command = /^(gcbot)$/i

module.exports = handler
