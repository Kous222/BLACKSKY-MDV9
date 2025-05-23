const hochladenImage = require('../lib/hochladenImage')
const ocrapi = require("ocr-space-api-wrapper")
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, Text }) => {
      let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Antworten Bild mit Befehl .ocr`
    if (!/Bild\/(jpe?g|png)/.test(mime)) throw `_*jenis ${mime} nicht didukung!*_`
    let img = await q.Herunterladen()
    let url = await hochladenImage(img)
    let result = await ocrapi.ocrSpace(url)
 await m.Antworten(result.ParsedResults[0].ParsedText)    
}

handler.help = ['ocr', 'texterkennung', 'textlesen', 'totext']
handler.tags = ['tools']
handler.command = /^(((ocr|totext)$|texterkennung|textlesen)|texterkennung|textlesen)/i
handler.limit = true

module.exports = handler