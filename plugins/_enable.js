let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false

  switch (type) {
    case 'antispam':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          return false
        }
        chat.antispam = isEnable
        m.reply(`*Antispam* wurde erfolgreich *${isEnable ? 'aktiviert' : 'deaktiviert'}* für diesen Chat.`)
      } else {
        global.dfail('group', m, conn)
      }
      break
    case 'notifgempa':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          return false
        }
        chat.notifgempa = isEnable
      } else return global.dfail('group', m, conn)
      break
    // Other cases go here
    default:
      if (!/[01]/.test(command)) return m.reply(`
List option:
| antispam
| notifgempa
| notifcuaca
| notifsholat
| antibot
| welcome
| delete
| etc.
Contoh:
${usedPrefix}enable antispam
${usedPrefix}disable antispam
`.trim())
      throw 'error'
  }

  // Send a German message for all types
  if (type === 'antispam' && isEnable) {
    m.reply(`⚠️ *Antispam wurde aktiviert* ⚠️

Spam-Schutz wurde für diese Gruppe aktiviert. Nutzer, die mehr als die erlaubte Nachrichtenfrequenz überschreiten, werden temporär gesperrt.`)
  } else if (type === 'antispam' && !isEnable) {
    m.reply(`✅ *Antispam wurde deaktiviert*

Spam-Schutz wurde für diese Gruppe deaktiviert.`)
  } else {
    m.reply(`
*${type}* wurde erfolgreich *${isEnable ? 'aktiviert' : 'deaktiviert'}* ${isAll ? 'für diesen Bot' : isUser ? '' : 'für diesen Chat'}
`.trim())
  }
}

handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler
