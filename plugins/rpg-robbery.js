// let pajak = 0.02
let handler = async (m, { conn, text, usedPrefix, command }) => {
let kann = (Math.floor(Math.random() * 100000))
let nomors = m.sender
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) return conn.reply(m.chat, 'Markiere einen Nutzer', m)
  if (typeof db.data.users[who] == 'undefined') throw 'Nutzer ist nicht in der Datenbank vorhanden'
  let __timers = (new Date - global.db.data.users[m.sender].lastrob)
  let _timers = (3600000 - __timers) 
  let timers = clockString(_timers)
  let users = global.db.data.users
  if (new Date - global.db.data.users[m.sender].lastrob > 3600000){
  if (10000 > users[who].Münzen) throw 'Das Ziel hat kein Geld, die Person ist arm'
  users[who].Münzen -= kann * 1
  users[m.sender].Münzen += kann * 1
  global.db.data.users[m.sender].lastrob = new Date * 1
  conn.reply(m.chat, `Du hast erfolgreich Geld in Höhe von ${kann} Münzen vom Ziel geraubt`, m)

}else conn.reply(m.chat, `Du hast bereits geraubt und dich erfolgreich versteckt, warte ${timers} bis du wieder rauben kannst`, m)
}
handler.help = ['rauben *@user*', 'stehlen *@user*']
handler.tags = ['rpg']
handler.command = /^(rauben|stehlen)$/
handler.limit = true
handler.group = true
handler.rpg = true
module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}