let fetch = require("node-fetch")
let handler = async(m, { conn, command }) => {
  try {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.quoted.sender ? m.quoted.sender : m.sender
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  conn.sendFile(m.chat, pp, "nih bang.png", 'Fertig....', m, {jpegThumbnail: await(await fetch(pp)).buffer()})
  } catch {
    let sender = m.sender
    let pp = await conn.profilePictureUrl(sender, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
    conn.sendFile(m.chat, pp, 'ppsad.png', "Fertig....", m, {jpegThumbnail: await(await fetch(pp)).buffer()})
  }
}
handler.help = ['getpp <@tag/reply>']
handler.tags = ['group']
handler.command = /^(getpp|getpic?t?|pp)$/i

module.exports = handler
