let handler = async (m, { conn }) => {
  let groupMetadata = await conn.groupMetadata(m.chat)
  let participants = groupMetadata.participants

  // Debug: Teilnehmer-Daten ausgeben (nur die ersten 3, um nicht zu viel zu zeigen)
  console.log('Teilnehmer Beispiel:', participants.slice(0, 3))

  const getGroupAdmins = (participants) => {
    let admins = []
    for (let participant of participants) {
      // Protokolliere jedes participant-Objekt hier
      console.log(participant.id, participant.admin) 
      // Mögliche Admin-Felder ausprobieren
      if (participant.isAdmin || participant.isSuperAdmin || participant.admin === 'admin' || participant.admin === 'superadmin') {
        admins.push(participant.id)
      }
    }
    return admins
  }

  const groupAdmins = getGroupAdmins(participants)
  let listAdmin = groupAdmins.map((v, i) => `🔥 ${i + 1}. @${v.split('@')[0]}`).join('\n')

  let text = `👑 *「 TAG ADMIN 」* 👑\n
📛 *Gruppenname:* 
${groupMetadata.subject}

🎖️ *Owner:* 
@${m.chat.split`-`[0]}

🛡️ *Admins:*
${listAdmin.length ? listAdmin : 'Keine Admins gefunden.'}

💬 *Lass die Admins wissen, dass du sie brauchst!* 🚀
`.trim()

  let ownernya = [`${m.chat.split`-`[0]}@s.whatsapp.net`]
  let mentionedJid = groupAdmins.concat(ownernya)

  await conn.reply(m.chat, text, m, { mentions: mentionedJid })
}

handler.help = ['tagadmin']
handler.tags = ['group']
handler.command = /^(tagadmin)$/i
handler.group = true

module.exports = handler
