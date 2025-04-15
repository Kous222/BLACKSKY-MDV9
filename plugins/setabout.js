let handler = async (m, { args, usedPrefix, command }) => {
  let about = args.join(' ')
  if (!about) {
    return m.reply(`⚠️ Gib bitte den Text für dein "Über mich" an.\n\nBeispiel:\n${usedPrefix}${command} Ich liebe Kaffee!`)
  }

  let user = global.db.data.users[m.sender]
  if (!user) global.db.data.users[m.sender] = {}
  user.about = about

  m.reply('✅ Dein "Über mich"-Text wurde erfolgreich aktualisiert!')
}

handler.help = ['setabout <text>']
handler.tags = ['info']
handler.command = /^setabout$/i
handler.register = false
handler.limit = false

module.exports = handler
