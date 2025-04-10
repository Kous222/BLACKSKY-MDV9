let handler = async (m, { args }) => {
  if (args.length !== 1) {
    return conn.reply(m.chat, '• *Example :* .pointoMünzen 1000', m)
  }
  let poin = parseInt(args[0])
  if (isNaN(poin) || poin < 1) {
    throw 'Die Anzahl der Punkte, die umgewandelt werden sollen, muss mindestens 1 betragen!'
  }
  let user = global.db.data.users[m.sender]
  if (poin > user.poin) {
    throw 'Entschuldigung, du hast nicht genug Punkte für die Umwandlung.'
  }

  let fee = Math.round(poin * 0.05)
  let Münzenp = poin - fee

  let message = `Hier sind die Details zur Umwandlung von Punkten in Geld:\n\n`
  message += `• Punkte Anzahl: ${poin}\n`
  message += `• Gebühr (5%): ${fee}\n`
  message += `• Geldmenge: ${Münzenp}`

  user.poin -= poin
  user.Münzen += Münzenp
  global.db.data.users[m.sender] = user
  global.db.write()

  m.reply(message)
}

handler.help = ['pointoMünzen']
handler.tags = ['rpg']
handler.command = /^pointoMünzen$/i
handler.register = true
handler.limit = true
handler.rpg = true
module.exports = handler