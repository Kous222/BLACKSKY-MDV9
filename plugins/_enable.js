let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const isEnable = /true|enable|(turn)?on|1/i.test(command)
  const chat = global.db.data.chats[m.chat]
  const type = (args[0] || '').toLowerCase()

  // Funktion, um den aktuellen Status zu melden
  function replyStatus(settingName, currentStatus) {
    const statusText = currentStatus ? 'bereits aktiviert' : 'bereits deaktiviert'
    conn.sendMessage(m.chat, {
      text: `ℹ️ ${settingName} ist ${statusText}.`,
    })
  }

  // Funktion zum Speichern der Settings
  async function saveChat() {
    try {
      await atlasDb.collection('chats').updateOne(
        { chatId: m.chat },
        { $set: chat },
        { upsert: true }
      )
    } catch (e) {
      console.error('Fehler beim Speichern:', e)
    }
  }

  // Funktion, um die Statusmeldung bei bereits aktivierter Einstellung zu senden
  function handleAlreadyActive(settingName, currentStatus) {
    replyStatus(settingName, currentStatus)
    return true
  }

  switch (type) {
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          return false
        }
        if (chat.antiLink === isEnable) {
          return handleAlreadyActive('Anti-Link', chat.antiLink)
        }
        chat.antiLink = isEnable
        break
      } else {
        return global.dfail('group', m, conn)
      }

    case 'nsfw':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          return false
        }
        if (chat.nsfw === isEnable) {
          return handleAlreadyActive('NSFW', chat.nsfw)
        }
        chat.nsfw = isEnable
        if (isEnable) {
          m.reply(`⚠️ *NSFW wurde aktiviert*\n\nDiese Gruppe kann nun Inhalte für Erwachsene anzeigen.\nNutze ${usedPrefix}menu nsfw, um verfügbare Befehle zu sehen.\n\nHinweis: NSFW-Inhalte sind nur für Personen ab 18 Jahren geeignet.`)
        } else {
          m.reply(`✅ *NSFW wurde deaktiviert*\n\nDiese Gruppe kann keine Inhalte für Erwachsene mehr anzeigen.`)
        }
        break
      } else {
        return global.dfail('group', m, conn)
      }

    case 'antiporn':
    case 'antiporno':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          return false
        }
        if (chat.antiporn === isEnable) {
          return handleAlreadyActive('Anti-Porn', chat.antiporn)
        }
        chat.antiporn = isEnable
        if (isEnable) {
          m.reply(`⚠️ *Anti-Porn wurde aktiviert*\n\nDiese Gruppe filtert pornografische Inhalte.`)
        } else {
          m.reply(`✅ *Anti-Porn wurde deaktiviert*\n\nDiese Gruppe zeigt keine pornografischen Inhalte mehr an.`)
        }
        break
      } else {
        return global.dfail('group', m, conn)
      }

    // Beispiel für andere Einstellungen:
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          return false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        return false
      }
      if (chat.welcome === isEnable) {
        return handleAlreadyActive('Willkommensnachricht', chat.welcome)
      }
      chat.welcome = isEnable
      break

    // Standardmäßige Rückmeldung für sonstige Einstellungen
    default:
      if (!/[01]/.test(command)) {
        return m.reply(`Liste der Optionen:\n
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

Beispiel:
${usedPrefix}enable welcome
${usedPrefix}disable welcome`)
        throw 'Unbekannte Option'
      }
  }

  // Spezielle Nachrichten für NSFW
  if (type === 'nsfw') {
    if (isEnable) {
      if (chat.nsfw === true) {
        return handleAlreadyActive('NSFW', true)
      }
      chat.nsfw = true
      return m.reply(`⚠️ *NSFW wurde aktiviert*\n\nDiese Gruppe kann nun Inhalte für Erwachsene anzeigen.\nNutze ${usedPrefix}menu nsfw, um verfügbare Befehle zu sehen.\n\nHinweis: NSFW-Inhalte sind nur für Personen ab 18 Jahren geeignet.`)
    } else {
      if (chat.nsfw === false) {
        return handleAlreadyActive('NSFW', false)
      }
      chat.nsfw = false
      return m.reply(`✅ *NSFW wurde deaktiviert*\n\nDiese Gruppe kann keine Inhalte für Erwachsene mehr anzeigen.`)
    }
  }

  // Nach Änderung eine Erfolgsmeldung schicken
  if (chat) {
    const nameMap = {
      'antilink': 'Anti-Link',
      'welcome': 'Willkommensnachricht',
      'detect': 'Detect',
      'delete': 'Delete',
      'autodelvn': 'Auto Delete VN',
      'autosticker': 'Auto Sticker',
      'antibot': 'Anti-Bot',
      'toxic': 'Toxisch',
      'antitoxic': 'Anti-Toxisch',
      'autolevelup': 'Auto Level Up',
      'mycontact': 'Meine Kontakte',
      'restrict': 'Restrict',
      'nyimak': 'Nyimak',
      'autoread': 'Auto Read',
      'pconly': 'Private Only',
      'gconly': 'Group Only',
      'swonly': 'Status Only',
      'autohd': 'Auto HD',
      'autobio': 'Auto Bio',
      'rpg': 'RPG',
      'autodl': 'Auto Download',
      'autobackup': 'Auto Backup',
      'viewonce': 'View Once',
      'antifile': 'Anti File',
      'autotranslate': 'Auto Translate',
      'nsfw': 'NSFW'
    }
    const name = nameMap[type] || type
    const currentStatus = chat[type]
    if (currentStatus === isEnable) {
      return handleAlreadyActive(name, currentStatus)
    }
    chat[type] = isEnable
    conn.sendMessage(m.chat, {
      text: `✅ ${name} wurde erfolgreich ${isEnable ? 'aktiviert' : 'deaktiviert'}.`
    })
  }
}

handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler