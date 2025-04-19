let handler = async (m, { conn, participants, isBotAdmin, isAdmin, isOwner }) => {
  if (!m.isGroup) throw 'Dieser Befehl funktioniert nur in Gruppen.'
  if (!isBotAdmin) throw 'Ich benötige Adminrechte, um das zu tun!'
  if (!isOwner) throw 'Nur der Bot-Besitzer kann diesen Befehl verwenden.'

  const user = m.sender

  // Teilnehmer finden
  const userInGroup = participants.find(p => p.id === user)
  if (!userInGroup) throw 'Du bist nicht Mitglied dieser Gruppe.'
  if (userInGroup.admin === 'admin' || userInGroup.admin === 'superadmin') {
    throw 'Du bist bereits Admin.'
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
  m.reply('Du wurdest erfolgreich zum Admin befördert.')
}

handler.help = ['promoteme']
handler.tags = ['group']
handler.command = /^promoteme$/i
handler.group = true

module.exports = handler

