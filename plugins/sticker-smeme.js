const hochladenImage = require('../lib/hochladenImage')
let handler = async (m, { conn, Text, usedPrefix, command }) => {

    let [oben, unten] = Text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Antworten Bild mit Befehl\n\n${usedPrefix + command} <${oben ? oben : 'Text oben'}>|<${unten ? unten : 'Text unten'}>`
    if (!/Bild\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} nicht didukung!*_`
    let img = await q.Herunterladen()
    let url = await hochladenImage(img)
    let meme = `https://api.memegen.Link/images/custom/${encodeURIComponent(oben ? oben : '')}/${encodeURIComponent(unten ? unten : '')}.png?background=${url}`
    conn.sendImageAsSticker(m.chat, meme, m, { packname: packname, author: author })

}
handler.help = ['stickermeme <Text>|<Text>']
handler.tags = ['Sticker']
handler.command = /^(s(tic?ker)?me(me)?)$/i

handler.limit = false

module.exports = handler
