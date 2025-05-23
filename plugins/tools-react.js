let handler = async (m, { conn, usedPrefix: _p, __dirname, args, Text, usedPrefix}) => {
	let notreply = 'Antworten Chatnya !'
	if (!m.quoted) throw notreply
	let notemo = `📍 Contoh Penggunaan :\n${usedPrefix}react 🗿`
	if (!Text) throw notemo
conn.relayMessage(m.chat, { reactionMessage: {
key: {
 id: m.quoted.id,
 remoteJid: m.chat,
 fromMe: true
},
 Text: `${Text}`}}, { messageId: m.id })
 }
 handler.help = ['react <emoji>']
handler.tags = ['tools']
handler.command = /^(react)$/i

module.exports = handler
