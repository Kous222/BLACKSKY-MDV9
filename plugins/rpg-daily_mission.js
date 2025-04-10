/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

const moment = require('moment-timezone')

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) throw 'Sie sind noch nicht in der Datenbank registriert'

  if (user.kerjalima && user.kerjalima > Date.now()) {
    let remainingTime = (user.kerjalima - Date.now()) / 1000 
    let hours = Math.floor(remainingTime / 3600)
    remainingTime %= 3600
    let minutes = Math.floor(remainingTime / 60)
    let seconds = Math.floor(remainingTime % 60)
    let remainingTimeString = `${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`
    throw `Sie haben bereits eine laufende Mission. Bitte versuchen Sie es erneut in *${remainingTimeString}.*`
  }

  m.reply('Sie bearbeiten gerade eine Mission..')
  await delay(2000)

  let randomMoney = Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000)
  let randomExp = Math.floor(Math.random() * (1000 - 100 + 1) + 100)
  let randomLimit = Math.floor(Math.random() * (20 - 10 + 1) + 10)

  user.Münzen += randomMoney
  user.Erfahrung += randomExp
  user.Limit += randomLimit

  let replyMsg = `*Herzlichen Glückwunsch! Sie haben die Tagesmission abgeschlossen*

◦ *Geld:* ${randomMoney}
◦ *Erfahrung:* ${randomExp}
◦ *Limit:* ${randomLimit}`

  global.db.data.users[m.sender] = user
  m.reply(replyMsg)

  user.kerjalima = Date.now() + 86400000 
  global.db.data.users[m.sender] = user
}

handler.help = ['tagesmission', 'täglich', 'tagesbelohnung', 'mission']
handler.tags = ['rpg']
handler.Limit = true
handler.command = /^(tagesmission|täglich|tagesbelohnung|mission)$/i
handler.rpg = true

module.exports = handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}