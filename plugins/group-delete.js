let handler = async (m, { conn, text, participants }) => {
  if (!m.isGroup) throw '❗ Dieser Befehl funktioniert nur in Gruppen.'

  const sender = participants.find(p => p.id === m.sender)
  const bot = participants.find(p => p.id === conn.user.jid)

  if (!sender?.admin) throw '❌ Nur Gruppen-Admins können diesen Befehl verwenden.'
  if (!bot?.admin) throw '❌ Ich benötige Adminrechte, um Nachrichten zu löschen.'

  if (!m.quoted) throw '⚠️ Bitte antworte auf die Nachricht eines Admins, um sie zu löschen.'

  const target = m.quoted.sender
  const targetIsAdmin = participants.find(p => p.id === target)?.admin

  if (!targetIsAdmin) throw '❌ Nur Nachrichten von Admins können mit diesem Befehl gelöscht werden.'

  try {
    await conn.sendMessage(m.chat, {
      delete: m.quoted.key
    })
    await conn.sendMessage(m.chat, {
      text: `✅ Nachricht von @${target.split('@')[0]} wurde erfolgreich gelöscht.`,
      mentions: [target]
    })
  } catch (e) {
    throw '❌ Beim Löschen ist ein Fehler aufgetreten.'
  }
}

handler.help = ['del']
handler.tags = ['group']
handler.command = /^(del|löschen)$/i

handler.group = true
handler.botAdmin = true

module.exports = handler
