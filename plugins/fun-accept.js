let handler = async (m, { conn, text }) => {
        if(isNaN(text)) {
        var number = text.split`@`[1]
  } else if(!isNaN(text)) {
        var number = text
  }

  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `*Gib eine Nummer, einen Tag oder antworte auf eine Chatnachricht deines Ziels.*`, m)
  // let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Zielnummer ist nicht bei WhatsApp registriert*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `*Ungültige Nummer.*`, m)
  if(number.length > 15) return conn.reply(m.chat, `*Ungültiges Format.*`, m)
  try {
                if(text) {
                        var user = number + '@s.whatsapp.net'
                } else if(m.quoted.sender) {
                        var user = m.quoted.sender
                } else if(m.mentionedJid) {
                  var user = number + '@s.whatsapp.net'
                        }  
                } catch (e) {
  } finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
    let users = m.isGroup ? participants.find(u => u.jid == user) : {}
    if(!user) return conn.reply(m.chat, `*Ziel oder Nummer nicht gefunden. Vielleicht ist die Person nicht mehr hier oder kein Mitglied dieser Gruppe.*`, m)
    if(user === m.sender) return conn.reply(m.chat, `*Du kannst keine Beziehung mit dir selbst eingehen.*`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `*Du kannst keine Beziehung mit dem Bot eingehen.*`, m)
    
    if(global.db.data.users[user].pasangan != m.sender){
      conn.reply(m.chat,`*Entschuldigung, @${user.split('@')[0]} hat dir keinen Beziehungsvorschlag gemacht*`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }else{
      global.db.data.users[m.sender].pasangan = user
      conn.reply(m.chat,`*Herzlichen Glückwunsch! Du bist jetzt offiziell in einer Beziehung mit @${user.split('@')[0]}*\n\n*Möge eure Beziehung lange halten und immer glücklich sein! @${user.split('@')[0]} ♡ @${m.sender.split('@')[0]} 🥳🥳*`,m,{contextInfo: {
        mentionedJid: [m.sender,user]
      }})
    }
        }       
}
handler.help = ['annehmen *@tag*', 'empfangen *@tag*']
handler.tags = ['fun']
handler.command = /^(annehmen|empfangen)$/i
handler.group = true
handler.limit = false
handler.fail = null
module.exports = handler
