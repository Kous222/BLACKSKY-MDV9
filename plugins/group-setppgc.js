let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (/image/.test(mime)) {
      let img = await q.herunterladen()
      if (!img) throw 'Bild nicht gefunden'
      await conn.updateProfilePicture(m.chat, img)
      m.reply('ppbot group erfolgreich in ändern')
  } else throw `senden/antworten Bild mit caption *${usedPrefix + command}*`
}
handler.help = ['setppgc'].map(v => v + ' <caption / reply image>')
handler.tags = ['adminry']
handler.command = /^(setppgc|setppgrup|setppgroup)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true
module.exports = handler

//nicht lupa install $ npm install @adiwajshing/baileys@Akkun3704/Baileys#profile-picture