let handler = async (m, { conn, text, usedPrefix }) => {
  let user = global.db.data.users[m.sender]
  
  if (!text) {
    return conn.reply(m.chat, `*❏ STATUS ÄNDERN*

Gib deinen gewünschten Status ein. Beispiel: *${usedPrefix}setstatus Vergeben*`, m)
  }

  // Set the relationship status to the provided text
  user.pasangan = text

  // Respond to the user
  conn.reply(m.chat, `*❏ STATUS ERFOLGREICH GEÄNDERT*

Dein Status wurde auf *${text}* geändert!`, m)
}

handler.help = ['setstatus <status>']
handler.tags = ['info']
handler.command = /^setstatus$/i

module.exports = handler
