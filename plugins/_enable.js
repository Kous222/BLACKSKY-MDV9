let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  global.db.data.chats = global.db.data.chats || {}
  global.db.data.settings = global.db.data.settings || {}

  const isEnable = /true|enable|(turn)?on|1/i.test(command)
  const chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}
  const setting = global.db.data.settings[conn.user?.jid] = global.db.data.settings[conn.user?.jid] || {}

  const type = (args[0] || '').toLowerCase()
  let isAlready, changed = false

  const reply = (text) => conn.reply(m.chat, text, m)

  const groupOnly = () => !m.isGroup && reply('❌ *Dieser Befehl kann nur in Gruppen verwendet werden!*')
  const adminOnly = () => !isAdmin && !isOwner && reply('⚠️ *Nur Gruppen-Admins können diese Option ändern.*')
  const ownerOnly = () => !isROwner && reply('🔐 *Nur der Bot-Besitzer kann diese Option ändern.*')

  const options = {
    welcome: { scope: 'chat', check: groupOnly },
    detect: { scope: 'chat', check: groupOnly },
    delete: { scope: 'chat', check: groupOnly },
    antidelete: { scope: 'chat', check: groupOnly },
    antisticker: { scope: 'chat', check: groupOnly },
    antilink: { scope: 'chat', check: groupOnly },
    antibot: { scope: 'chat', check: groupOnly },
    nsfw: { scope: 'chat', check: groupOnly },
    autolevelup: { scope: 'user' },
    restrict: { scope: 'global', check: ownerOnly },
    autoread: { scope: 'global', check: ownerOnly },
    public: { scope: 'global', check: ownerOnly },
    autobio: { scope: 'global', check: ownerOnly },
    document: { scope: 'global', check: ownerOnly },
    viewonce: { scope: 'global', check: ownerOnly },
    nyimak: { scope: 'global', check: ownerOnly },
    pconly: { scope: 'global', check: ownerOnly },
    gconly: { scope: 'global', check: ownerOnly },
    swonly: { scope: 'global', check: ownerOnly },
    whitelistmycontacts: { scope: 'global', check: ownerOnly },
    autodl: { scope: 'global', check: ownerOnly },
    autobackup: { scope: 'global', check: ownerOnly },
    rpg: { scope: 'chat', check: groupOnly },
    notifgempa: { scope: 'global', check: ownerOnly },
    notifcuaca: { scope: 'global', check: ownerOnly },
    notifsholat: { scope: 'global', check: ownerOnly },
    antiporn: { scope: 'global', check: ownerOnly },
    autohd: { scope: 'global', check: ownerOnly },
    autosticker: { scope: 'global', check: ownerOnly },
    autodatabase: { scope: 'global', check: ownerOnly },
    autotranslate: { scope: 'global', check: ownerOnly },
    antirechts: { scope: 'chat', check: groupOnly }, // NEW
  }

  if (!(type in options)) {
    return reply(`❗ *Ungültige Option: '${type}'*\n\n✅ *Verfügbare Optionen:*\n${Object.keys(options).map(v => '• `' + v + '`').join('\n')}`)
  }

  const opt = options[type]
  if (opt.check) opt.check()

  if (opt.scope === 'chat') {
    isAlready = chat[type] === isEnable
    if (!isAlready) {
      chat[type] = isEnable
      changed = true
    }
  } else if (opt.scope === 'user') {
    global.db.data.users[m.sender][type] = isEnable
    changed = true
  } else if (opt.scope === 'global') {
    isAlready = setting[type] === isEnable
    if (!isAlready) {
      setting[type] = isEnable
      changed = true
    }
  }

  const statusEmoji = isEnable ? '✅' : '⛔'
  const statusText = isEnable ? '*AKTIVIERT*' : '*DEAKTIVIERT*'

  if (!changed) {
    return reply(`ℹ️ *Die Option* \`${type}\` *ist bereits ${statusText}.*`)
  } else {
    return reply(`${statusEmoji} *Erfolg!*\n\nDie Option \`${type}\` wurde erfolgreich ${statusText}.`)
  }
}

handler.help = ['enable', 'disable'].map(v => v + ' <option>')
handler.tags = ['owner', 'group']
handler.command = /^(true|enable|(turn)?on|false|disable|(turn)?off|0|1)$/i

module.exports = handler;
