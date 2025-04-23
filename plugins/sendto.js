let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  if (!text.includes('|')) throw `Verwendung:\n${usedPrefix + command} <Nummer>|<Nachricht>\nBeispiel:\n${usedPrefix + command} 49123456789|Hallo!`

  let [number, ...messageParts] = text.split('|')
  let message = messageParts.join('|').trim()

  number = number.replace(/\D/g, '') + '@s.whatsapp.net'

  if (!message) throw 'Bitte gib eine Nachricht ein, die gesendet werden soll.'

  await conn.sendMessage(number, {
    text: `${message}`
  })

  m.reply(`✅ Nachricht wurde an ${number.replace(/@.+/, '')} gesendet.`)
}

handler.help = ['sendto <nummer>|<nachricht>']
handler.tags = ['tools']
handler.command = /^sendto$/i

module.exports = handler
