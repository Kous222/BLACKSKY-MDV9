let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  user.Münzen ??= 0
  user.bank ??= 0

  let amount = parseInt(args[0])
  if (isNaN(amount) || amount <= 0) return m.reply('❌ Bitte gib einen gültigen Betrag zum Abheben an.\n\nBeispiel: *.pull 200*')
  if (user.bank < amount) return m.reply('❌ Du hast nicht genug Guthaben auf deinem Bankkonto.')

  user.bank -= amount
  user.Münzen += amount

  m.reply(`✅ Du hast erfolgreich *${amount} Münzen* von deinem Bankkonto abgehoben.`)
}

handler.help = ['pull <Betrag> - Hebe Geld von deinem Bankkonto ab.']
handler.tags = ['rpg']
handler.command = /^pull$/i
handler.rpg = true

module.exports = handler
