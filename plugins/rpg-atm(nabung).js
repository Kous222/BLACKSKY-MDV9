let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  user.Münzen ??= 0
  user.bank ??= 0

  let amount = parseInt(args[0])
  if (isNaN(amount) || amount <= 0) return m.reply('❌ Bitte gib einen gültigen Betrag zum Einzahlen an.\n\nBeispiel: *.atm 100*')
  if (user.Münzen < amount) return m.reply('❌ Du hast nicht genug Münzen, um diesen Betrag einzuzahlen.')

  user.Münzen -= amount
  user.bank += amount

  m.reply(`✅ Du hast erfolgreich *${amount} Münzen* auf dein Bankkonto eingezahlt.`)
}

handler.help = ['atm <Betrag> - Zahle Geld auf dein Bankkonto ein.']
handler.tags = ['rpg']
handler.command = /^atm$/i
handler.rpg = true

module.exports = handler
