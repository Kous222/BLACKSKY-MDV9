let handler = async (m, { args }) => {
  if (args.length !== 1) {
    return conn.reply(m.chat, 'Bitte gib die Anzahl der Münzen ein, die du in Punkte umwandeln möchtest! Beispiel: .münzenzupunkten 1000', m)
  }
  let Münzen = parseInt(args[0])
  if (isNaN(Münzen) || Münzen <= 0) {
    throw 'Die eingegebene Münzanzahl muss eine positive Zahl sein!'
  }
  let fee = Math.floor(Münzen * 0.5)
  let punkte = Math.floor(Münzen * 0.5)
  let message = `• Du hast Münzen im Wert von ${Münzen} umgewandelt\n`
  message += `• Du erhältst Punkte im Wert von ${punkte}\n`
  message += `• Die Gebühr beträgt ${fee} Münzen`
  let user = global.db.data.users[m.sender]
  if (!user) {
    user = { poin: 0 }
    global.db.data.users[m.sender] = user
  }
  user.poin = (user.poin || 0) + punkte
  user.Münzen -= Münzen
  global.db.write()
  conn.reply(m.chat, message, m)
}

handler.help = ['münzenzupunkten *<betrag>*', 'münzenpunkte *<betrag>*']
handler.tags = ['rpg']
handler.command = /^(münzenzupunkten|münzenpunkte)$/i
handler.register = true
handler.limit = true
handler.rpg = true
module.exports = handler