// let pajak = 0.02
let handler = async (m, { conn, text }) => {
let kann = (Math.floor(Math.random() * 5000))
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '• *Beispiel:* .handeln @user'
  if (typeof db.data.users[who] == 'undefined') throw 'Dieser Nutzer existiert nicht in der Datenbank'
  let __timers = (new Date - global.db.data.users[m.sender].lastdagang)
  let _timers = (28800000 - __timers) 
  let timers = clockString(_timers)
  let users = global.db.data.users
  let username = conn.getName(who)
  if (new Date - global.db.data.users[m.sender].lastdagang > 28800000){
  if (4999 > users[who].Münzen) throw 'Ziel hat nicht genug Kapital. Mindestens 5000 Münzen erforderlich.'
  if (4999 > users[m.sender].Münzen) throw 'Du hast nicht genug Kapital. Mindestens 5000 Münzen erforderlich.'
  users[who].Münzen -= kann * 1
 users[m.sender].Münzen -= kann * 1
  global.db.data.users[m.sender].lastdagang = new Date * 1
  conn.reply(m.chat, `Bitte warten...\nDu und @${who.split`@`[0]} handeln gerade... 😅\n\nDu und @${who.split`@`[0]} habt Kapital eingesetzt: -${kann} 😅`, m)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 3600000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 7200000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 10800000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 14400000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 18000000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 21600000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +5000\n${users[m.sender].Münzen += 5000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +5000\n${users[who].Münzen += 5000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 25200000)
  setTimeout(() => {
                                        conn.reply(m.chat, `Herzlichen Glückwunsch! Du und @${who.split`@`[0]} erhaltet Münzen..\n\nHandelsertrag für dich: +10000\n${users[m.sender].Münzen += 10000} Münzen - dein Konto\n\nHandelsertrag für @${who.split`@`[0]}: +10000\n${users[who].Münzen += 10000} Münzen - Konto von @${who.split`@`[0]}`, m)
                                        }, 28800000)
}else conn.reply(m.chat, `Du handelst bereits. Bitte warte ${timers} bis zum nächsten Handel.`, m)
}
handler.help = ['berdagang *@tag*', 'handeln *@tag*', 'handel *@tag*']
handler.tags = ['rpg']
handler.command = /^berdagang|handeln|handel$/
handler.register = true
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