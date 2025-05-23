let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender]
  let opponent = m.mentionedJid[0]
  
  if (!user || !global.db.data.users[opponent]) {
    return conn.reply(m.chat, '• *Beispiel:* .kämpfen @user', m)
  }
    
        conn.sendMessage(m.chat, {
                react: {
                        text: '🕒',
                        key: m.key,
                }
        })
  
  let alasanKalah = `${pickRandom(['Du bist zu schwach für diesen Kampf und musst eine Strafe zahlen', 'Du solltest besser trainieren, bevor du kämpfst. Strafe muss gezahlt werden', 'Kämpfe nicht, wenn du nicht bereit bist. Du musst eine Strafe zahlen', 'Der Gegner war zu stark für dich. Strafe muss gezahlt werden', 'Geh lieber nach Hause und trainiere mehr. Du musst eine Strafe zahlen'])}`
  let alasanMenang = `${pickRandom(['Du hast erfolgreich elementare Kräfte benutzt, um die Verteidigung deines Gegners zu zerstören und erhältst', 'Du hast einen tödlichen Angriff mit akrobatischen Bewegungen ausgeführt, die deinen Gegner verwirrt haben, und erhältst', 'Du hast gewonnen, weil du besser vorbereitet warst, und erhältst', 'Du hast gewonnen, weil deine Taktik überlegen war, und erhältst', 'Du hast gewonnen, weil das Glück auf deiner Seite war, und erhältst', 'Du hast gewonnen, weil du gegen einen schwächeren Gegner gekämpft hast, und erhältst'])}`

  let betAmount = Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000 
  
  if (user.Münzen < betAmount) {
    return conn.reply(m.chat, 'Du hast nicht genug Geld', m)
  }
  
  if (user.lastWar && (new Date - user.lastWar) < 10000) {
    let remainingTime = Math.ceil((10000 - (new Date() - user.lastWar)) / 1000)
    return conn.reply(m.chat, `Du musst ${remainingTime} Sekunden warten, bevor du wieder kämpfen kannst`, m)
  }
  
  conn.reply(m.chat, 'Arena wird vorbereitet...', m)
  
  setTimeout(() => {
    conn.reply(m.chat, 'Arena bereit...', m)
    
    setTimeout(() => {
      conn.reply(m.chat, 'Kampf beginnt...', m)
      
      setTimeout(() => {
        let result = Math.random() >= 0.5 
        let wonAmount = result ? betAmount : -betAmount 
        
        user.Münzen += wonAmount
        global.db.data.users[opponent].Münzen -= wonAmount
        
        let opponentName = conn.getName(opponent) 
        
        let caption = `❏  *K A M P F*\n\n`
        caption += `Dein Gegner: ${opponentName}\nLevel: [${global.db.data.users[m.sender].Stufe}]\n\n`
        
        if (result) {
          caption += `*Gewonnen!* ${alasanMenang} +${betAmount} Münzen\n`
          caption += `Dein aktuelles Guthaben: ${user.Münzen} Münzen\n`
          conn.sendFile(m.chat, 'https://telegra.ph/file/e3d5059b970d60bc438ac.jpg', 'You_Win.jpg', caption, m)
        } else {
          caption += `*Verloren!* ${alasanKalah} -${betAmount} Münzen\n`
          caption += `Dein aktuelles Guthaben: ${user.Münzen} Münzen\n`
          conn.sendFile(m.chat, 'https://telegra.ph/file/86b2dc906fb444b8bb6f7.jpg', 'You_Lose.jpg', caption, m)
        }

        user.lastWar = new Date() 
        
        setTimeout(() => {
          conn.reply(m.chat, `Du kannst in 5 Sekunden wieder kämpfen`, m)
        }, 5000) // https://github.com/SazumiVicky/MakeMeow-Games
      }, 2000)
    }, 2000) 
  }, 2000) 
}

handler.help = ['bertarung *@user*', 'fight *@user*', 'kämpfen *@user*', 'kampf *@user*']
handler.tags = ['rpg']
handler.command = /^(fight|bertarung|kämpfen|kampf)$/i
handler.group = true
handler.rpg = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}