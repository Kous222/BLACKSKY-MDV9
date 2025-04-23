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
     if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autosticker = isEnable
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
    case 'toxic':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiToxic = !isEnable
      break
    case 'antitoxic':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiToxic = isEnable
      break
    case 'autolevelup':
      isUser = true
      user.autolevelup = isEnable
      break
    case 'mycontact':
    case 'mycontacts':
    case 'whitelistcontact':
    case 'whitelistcontacts':
    case 'whitelistmycontact':
    case 'whitelistmycontacts':
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      conn.callWhitelistMode = isEnable
      break
    case 'restrict':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['restrict'] = isEnable
      break
    case 'nyimak':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
    case 'pconly':
    case 'privateonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
    case 'gconly':
    case 'grouponly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
    case 'swonly':
    case 'statusonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['swonly'] = isEnable
      break
    case 'antifoto':
      if (m.isGroup) {
      if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
    }
      chat.antiFoto = isEnable
      break
    case 'antisticker':
    if (m.isGroup) {
      if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
    }
    chat.antiSticker = isEnable
    break
    case 'viewonce':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.viewonce = isEnable
    break
    case 'antifile':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antifile = isEnable
    break
  case 'autobackup':
      if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        chat.autobackup = isEnable
      break 
    case 'antivideo':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antivideo = isEnable
      break
      case 'antiporn':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiporn = isEnable
      break
      case 'autohd':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.autohd = isEnable
        break
        case 'autobio':
      if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
              global.dfail('admin', m, conn)
              return false
          }
          chat.autobio = isEnable
      } else return global.dfail('group', m, conn)
      break
      case 'rpg':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.rpg = isEnable
        break
    case 'autodl':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autodl = isEnable
      break
    case 'autotranslate':
      if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
              global.dfail('admin', m, conn)
              return false
          }
          chat.autotranslate = isEnable
      } else return global.dfail('group', m, conn)
      break
    case 'nsfw':
      if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
              global.dfail('admin', m, conn)
              return false
          }
          chat.nsfw = isEnable
          if (isEnable) {
            m.reply(`⚠️ *WARNUNG*: NSFW-Inhalte wurden für diesen Chat aktiviert. Diese Funktion ist nur für Erwachsene geeignet!`) 
          } else {
            m.reply(`✅ NSFW-Inhalte wurden deaktiviert.`)
          }
      } else return global.dfail('group', m, conn)
      break
    default:
      if (!/[01]/.test(command)) return m.reply(`
List option:
| autodl
| autobackup
| rpg
| autobio
| notifgempa
| notifcuaca
| notifsholat
| antiporn
| welcome
| delete
| antibot
| public
| autohd
| antilink
| antidelete
| autosticker
| autolevelup
| antisticker
| detect
| viewonce
| document
| whitelistmycontacts
| restrict
| nyimak
| autoread
| pconly
| gconly
| swonly
| nsfw
| autodatabase
| autotranslate
Contoh:
${usedPrefix}enable welcome
${usedPrefix}disable welcome
`.trim())
      throw 'error'
  }
  // Send a German message for all types
  if (type === 'nsfw' && isEnable) {
    // Special message for enabling NSFW
    m.reply(`⚠️ *NSFW wurde aktiviert* ⚠️
    
Diese Gruppe kann nun Inhalte für Erwachsene anzeigen.
Nutze .menu nsfw um verfügbare Befehle zu sehen.

Hinweis: NSFW-Inhalte sind nur für Personen ab 18 Jahren geeignet.`.trim())
  } else if (type === 'nsfw' && !isEnable) {
    // Special message for disabling NSFW
    m.reply(`✅ *NSFW wurde deaktiviert*
    
Diese Gruppe kann keine Inhalte für Erwachsene mehr anzeigen.`.trim())
  } else {
    // Standard message for other types
    m.reply(`
*${type}* wurde erfolgreich *${isEnable ? 'aktiviert' : 'deaktiviert'}* ${isAll ? 'für diesen Bot' : isUser ? '' : 'für diesen Chat'}
`.trim())
  }
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler