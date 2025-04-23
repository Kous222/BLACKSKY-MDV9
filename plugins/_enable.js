let handler = async (m, { conn, args, usedPrefix, command }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(args[0])
  let type = (args[1] || '').toLowerCase()
  let isGlobal = false

  switch (type) {
    case 'welcome':
    case 'detect':
    case 'delete':
    case 'autolevelup':
    case 'antilink':
    case 'antilink2':
    case 'antiviewonce':
    case 'antidelete':
    case 'antitoxic':
    case 'antitraba':
    case 'antiarab':
    case 'modohorny':
    case 'modoadmin':
    case 'audios':
    case 'antibot':
    case 'antispam':
      break
    case 'public':
      isGlobal = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      break
    default:
      if (!/[01]/.test(args[0])) throw `
*[❗] Gebrauch:*  
*.enable* <Option>  
*.disable* <Option>  
  
*Beispiele:*  
*.enable welcome*  
*.disable antilink*  
  
*Optionen:*  
- welcome  
- detect  
- delete  
- public  
- autolevelup  
- antilink  
- antilink2  
- antiviewonce  
- antidelete  
- antitoxic  
- antitraba  
- antiarab  
- antibot  
- antispam  
- modohorny  
- modoadmin  
- audios`
      throw false
  }

  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid] || {}

  switch (type) {
    case 'welcome':
      chat.welcome = isEnable
      break
    case 'detect':
      chat.detect = isEnable
      break
    case 'delete':
      chat.delete = isEnable
      break
    case 'autolevelup':
      chat.autolevelup = isEnable
      break
    case 'antilink':
      chat.antilink = isEnable
      break
    case 'antilink2':
      chat.antilink2 = isEnable
      break
    case 'antiviewonce':
      chat.antiviewonce = isEnable
      break
    case 'antidelete':
      chat.antidelete = isEnable
      break
    case 'antitoxic':
      chat.antitoxic = isEnable
      break
    case 'antitraba':
      chat.antitraba = isEnable
      break
    case 'antiarab':
      chat.antiarab = isEnable
      break
    case 'modohorny':
      chat.modohorny = isEnable
      break
    case 'modoadmin':
      chat.modoadmin = isEnable
      break
    case 'audios':
      chat.audios = isEnable
      break
    case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break
    case 'antispam':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antispam = isEnable
      break
    case 'public':
      bot.self = !isEnable
      break
    default:
      throw ''
  }

  m.reply(`*Die Option "${type}" wurde erfolgreich ${isEnable ? 'aktiviert' : 'deaktiviert'}.*`)
}

handler.help = ['enable <option>', 'disable <option>']
handler.tags = ['group', 'owner']
handler.command = /^(enable|disable|(turn)?on|off)$/i

module.exports = handler
