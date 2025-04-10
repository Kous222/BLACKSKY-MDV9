let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	try {
	let medien = await q.Herunterladen?.()
	await conn.sendFile(m.chat, medien, null, '', m)
	} catch (e) {
      m.Antworten('Medien Fehlgeschlagen dimuat!')
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'rvo', 'liat', 'readvo']
handler.Premium = false
handler.register = false
handler.fail = null

module.exports = handler
