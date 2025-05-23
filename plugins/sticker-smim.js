const hochladenImage = require('../lib/hochladenImage')
const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, Text, usedPrefix, command }) => {

    let [oben, unten] = Text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Antworten Bild mit Befehl\n\n${usedPrefix + command} <${oben ? oben : 'Text oben'}>|<${unten ? unten : 'Text unten'}>`
    if (!/Bild\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} nicht didukung!*_`
    let img = await q.Herunterladen()
    let url = await hochladenImage(img)
    meme = `https://api.memegen.Link/images/custom/${encodeURIComponent(oben ? oben : '')}/${encodeURIComponent(unten ? unten : '')}.png?background=${url}`
try {
    let stickerImg = await sticker(null, meme, global.packname, global.author)
    await conn.sendFile(m.chat, stickerImg, {
      quoted: m
    })
  } catch (e) {
    m.Antworten('Fehlgeschlagen memerstellen Sticker, Versuchen Senden Bild')
    await conn.sendFile(m.chat, meme, 'Bild.png', 'JADIKAN Sticker SECARA MANUAL MIT MENGETIK .S', m)
  }
}
handler.help = ['smim <Text oben>|<Text unten>']
handler.tags = ['Sticker']
handler.command = /^(smim)$/i

handler.limit = false

module.exports = handler
