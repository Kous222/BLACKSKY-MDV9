let handler = async (m, { conn, Text, usedPrefix, command }) => {
  if (!Text) return m.Antworten(`Mengbenutze Befehl\n\n*${usedPrefix + command}* hallo was? @${m.sender.split`@`[0]} nicht gibt und Sie`, null, { mentions: [m.sender] })
  let cm = copy(m)
  let who
  if (Text.includes('@0')) who = '0@s.whatsapp.net'
  else if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) return m.Antworten(`Mengbenutze Befehl\n\n*${usedPrefix + command}* hallo was? @${m.sender.split`@`[0]} nicht gibt und Sie`, null, { mentions: [m.sender] })
  cm.key.fromMe = false 
  cm.Nachricht[m.mtype] = copy(m.msg)
  let sp = '@' + who.split`@`[0]
  let [fake, ...real] = Text.split(sp)
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim())
    }
  })
}
handler.help = ['fake <Text> @user <text2>']
handler.tags = ['tools']
handler.command = /^(fitnah|fakereply|fake)$/

module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}