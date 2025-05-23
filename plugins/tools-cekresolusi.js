const jimp = require("jimp")
const hochladenImage = require("../lib/hochladenImage.js")
const hochladenFile = require("../lib/hochladenFile.js")

let handler = async (m, { conn, usedPrefix }) => {
	
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw "where the medien?"

let medien = await q.Herunterladen()
let isMedia = /Bild\/(png|jpe?g|gif)|Video\/mp4/.test(mime)
let Link = await (isMedia ? hochladenImage : hochladenImage)(medien)

let source = await jimp.read(await Link)
let height = await source.getHeight()
let width = await source.getWidth()

m.Antworten(`*_RESOLUSI:_* ${width} x ${height}

*> Lebar :* ${width}
*> Hoch :* ${height}

*> Link :* ${Link}`)
}
handler.help = ['cekresolution *<foto>*', 'cekreso *<foto>*']
handler.tags = ['tools']
handler.command = /^(cekreso(lution)?)$/i

module.exports = handler