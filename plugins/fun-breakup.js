let handler = async (m, { conn }) => {
  ayg = global.db.data.users[m.sender]

  if(ayg.pasangan == ""){
    return conn.reply(m.chat,`Du bist mit niemandem in einer Beziehung.`,m)
  }
  
  beb = global.db.data.users[global.db.data.users[m.sender].pasangan]

  if (typeof beb == "undefined"){
    conn.reply(m.chat,`Beziehung mit @${global.db.data.users[m.sender].pasangan.split('@')[0]} erfolgreich beendet`,m,{contextInfo: {
      mentionedJid: [global.db.data.users[m.sender].pasangan]
    }})
    ayg.pasangan = ""
  }

  if (m.sender == beb.pasangan){
    conn.reply(m.chat,`Beziehung mit @${global.db.data.users[m.sender].pasangan.split('@')[0]} erfolgreich beendet`,m,{contextInfo: {
      mentionedJid: [global.db.data.users[m.sender].pasangan]
    }})
    ayg.pasangan = ""
    beb.pasangan = ""
  }else {
    conn.reply(m.chat,`Du bist mit niemandem in einer Beziehung.`,m)
  }
}
handler.help = ['trennen', 'putus']
handler.tags = ['fun']
handler.command = /^(trennen|putus)$/i
handler.group = true
handler.limit = true
handler.fail = null
module.exports = handler
