let handler = async (m, { conn }) => {
  try {
    conn.reply(m.chat, `*Gruppenlink:* ${await conn.getName(m.chat)}\n\nhttps://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat) + `\n\n${conn.user.name}`, m)
  } catch {
    conn.reply(m.chat, `Macht @${conn.user.jid.split('@')[0]} zum Admin, um diesen Befehl zu nutzen!`, m, { mentions: [conn.user.jid] })
  }
}
handler.help = ['linkgroup', 'gruppenlink', 'gruppelink']
handler.tags = ['gruppe']
handler.command = /^(Link(g(c)?ro?up)?|gruppen?link)$/i

handler.group = true
handler.admin = true

module.exports = handler