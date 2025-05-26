let handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m
    try {
        let medien = await q.download?.()
        await conn.sendFile(m.chat, medien, null, '', m)
    } catch (e) {
        m.reply('❌ Medien konnten nicht geladen werden!')
    }
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'rvo', 'anzeigen', 'einmalansehen']
handler.premium = false
handler.register = false
handler.fail = null

module.exports = handler
