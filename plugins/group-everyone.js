let handler = async (m, { conn, participants, args, usedPrefix, command }) => {
    let text = args.join` `
    let teks = `*Everyone Tagger*\n\n${text ? text + '\n\n' : ''}`
    for (let user of participants) {
        teks += `@${user.id.split('@')[0]} `
    }

    await conn.sendMessage(m.chat, {
        text: teks.trim(),
        mentions: participants.map(p => p.id)
    }, { quoted: m })
}

handler.help = ['everyone <text>']
handler.tags = ['group']
handler.command = /^(everyone)$/i
handler.group = true
handler.admin = true

