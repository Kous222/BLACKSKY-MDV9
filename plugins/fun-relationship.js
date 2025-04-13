let handler = async (m, { conn, text, usedPrefix, command }) => {
  let target

  if (m.quoted) {
    target = m.quoted.sender
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = m.mentionedJid[0]
  }

  if (!target) throw `⚠️ Bitte antworte auf eine Nachricht oder erwähne jemanden mit *@Benutzer*.\n\nBeispiel:\n*${usedPrefix}${command} @Benutzer*`

  let user1 = m.sender
  let user2 = target

  if (user1 === user2) throw '❗ Du kannst dich nicht mit dir selbst shippen!'

  const beziehungen = [
    'Seelenverwandte',
    'Geheime Verehrer',
    'Beste Freunde',
    'Zufällige Bekannte',
    'Feinde fürs Leben',
    'Ex-Paar',
    'Internet-Liebe',
    'Cousins (leider)',
    'Nur Freunde… vielleicht?',
    'Cringe Duo',
    'Power Couple',
    'Erzfeinde',
    'Fast verheiratet',
    'Verbotene Liebe',
    'Fake Love'
  ]

  const emojis = ['❤️', '🔥', '💀', '✨', '🥀', '💘', '💔', '💕', '🤣', '😎', '😳', '👀']
  const match = beziehungen[Math.floor(Math.random() * beziehungen.length)]
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]

  const tag1 = '@' + user1.split('@')[0]
  const tag2 = '@' + user2.split('@')[0]

  let result = `*${emoji} Beziehungstest ${emoji}*\n\n` +
               `👤 ${tag1} ❤️ ${tag2}\n` +
               `\n💞 Ergebnis: *${match}*`

  await conn.sendMessage(m.chat, {
    text: result,
    mentions: [user1, user2]
  })
}

handler.help = ['ship @user']
handler.tags = ['fun']
handler.command = /^ship$/i

module.exports = handler
