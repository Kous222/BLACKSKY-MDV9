let handler = async (m, { command }) => {
  const emoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
  let userRoll = Math.floor(Math.random() * 6)
  let botRoll = Math.floor(Math.random() * 6)

  let result = userRoll === botRoll
    ? '🤝 Unentschieden!'
    : userRoll > botRoll
      ? '🎉 Du hast *gewonnen*!'
      : '💥 Du hast *verloren*!'

  let msg = `
🎲 *Würfeln!*
───────────────
👤 Du: ${emoji[userRoll]}
🤖 Bot: ${emoji[botRoll]}
───────────────
${result}`

  m.reply(msg.trim())
}

handler.command = /^dice|würfel$/i
handler.help = ['dice', 'würfel']
handler.tags = ['game']
module.exports = handler
