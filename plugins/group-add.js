const fetch = require('node-fetch')
const {
  getBinaryNodeChild,
  getBinaryNodeChildren
} = require('@adiwajshing/baileys')

const handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) throw `_Bitte gib eine Nummer ein!_\nBeispiel:\n\n${usedPrefix + command} ${global.owner[0]}`
  m.reply('_Wird verarbeitet..._')

  const groupId = m.chat
  const groupName = await conn.getName(groupId)
  const groupPP = await conn.profilePictureUrl(groupId, 'image').catch(() => null)
  const jpegThumbnail = groupPP
    ? Buffer.from(await (await fetch(groupPP)).arrayBuffer())
    : Buffer.alloc(0)

  const currentParticipants = participants.map(u => u.id)

  // Nummern verarbeiten & prüfen
  const users = (
    await Promise.all(
      text.split(',')
        .map(v => v.replace(/[^0-9]/g, ''))
        .filter(v => v.length > 4 && v.length < 20 && !currentParticipants.includes(v + '@s.whatsapp.net'))
        .map(async v => [
          v,
          await conn.onWhatsApp(v + '@s.whatsapp.net')
        ])
    )
  )
    .filter(v => v[1][0]?.exists)
    .map(v => v[0] + '@c.us')

  // Versuch, direkt hinzuzufügen
  const response = await conn.query({
    tag: 'iq',
    attrs: {
      type: 'set',
      xmlns: 'w:g2',
      to: groupId,
    },
    content: users.map(jid => ({
      tag: 'add',
      attrs: {},
      content: [{ tag: 'participant', attrs: { jid } }]
    }))
  })

  const addNode = getBinaryNodeChild(response, 'add')
  const participantsNodes = getBinaryNodeChildren(response, 'add')

  if (!participantsNodes?.[0]) return

  // Fehlgeschlagene Versuche
  for (const user of participantsNodes[0].content || []) {
    const jid = user?.attrs?.jid || 'Unbekannt'
    const error = user?.attrs?.error

    if (error == 408) {
      await conn.sendButton(m.chat,
        `Konnte @${jid.split('@')[0]} nicht hinzufügen!\nAnscheinend hat die Person diese Gruppe verlassen.`,
        'Community-Bot',
        'Link zur Gruppe',
        `${usedPrefix}link`,
        m,
        { mentions: [jid] }
      )
    }

    if (error == 403) {
      const content = getBinaryNodeChild(user, 'add_request')
      const invite_code = content?.attrs?.code
      const invite_code_exp = content?.attrs?.expiration

      if (invite_code && invite_code_exp) {
        const info = `Lade @${jid.split('@')[0]} per Einladung ein...`
        await conn.sendMessage(m.chat, { text: info, mentions: [jid] })

        await conn.sendGroupV4Invite(
          m.chat,
          jid,
          invite_code,
          invite_code_exp,
          groupName,
          'Einladung zur Community-Gruppe',
          jpegThumbnail
        )
      } else {
        console.error(`Einladung für ${jid} fehlgeschlagen: Kein Code oder Ablaufdatum`)
      }
    }
  }
}

handler.help = ['add', '+', 'einladen'].map(v => v + ' <Nummer>')
handler.tags = ['group']
handler.command = /^(add|\+|hinzufügen|einladen)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler
