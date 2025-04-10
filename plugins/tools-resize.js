const jimp = require("jimp")
const hochladenImage = require("../lib/hochladenImage.js")
const hochladenFile = require("../lib/hochladenFile.js")

let handler = async (m, { conn, usedPrefix, args }) => {
    let toWidth = args[0]
    let toHeight = args[1]
    if (!toWidth) throw 'Please provide the width.'
    if (!toHeight) throw 'Please provide the height.'
    let quotedMsg = m.quoted ? m.quoted : m
    let mime = (quotedMsg.msg || quotedMsg).mimetype || ''
    if (!mime) throw "Medien not Gefunden."

    let medien = await quotedMsg.Herunterladen()
    let isMedia = /Bild\/(png|jpe?g|gif)|Video\/mp4/.test(mime)
    if (!isMedia) throw `The "${mime}" type is not supported.`
    let Link = await (isMedia ? hochladenImage : hochladenImage)(medien)
    let source = await jimp.read(await Link)
    let size = {
        before: {
            height: await source.getHeight(),
            width: await source.getWidth()
        },
        after: { 
            height: toHeight,
            width: toWidth,
        }
    }
    let compres = await conn.resize(Link, toWidth - 0, toHeight - 0)
    let linkCompres = await (isMedia ? hochladenImage : hochladenImage)(compres)
    conn.sendFile(m.chat, compres, null, `
• BEFORE
*+* Width : ${size.before.width}
*+* Height : ${size.before.height}

• AFTER
*+* Width : ${size.after.width}
*+* Height : ${size.after.height}

• Link
*+* Original: ${Link}
*+* Compressed: ${linkCompres}`, m)
}

handler.help = ['resize <width> <height> (Antworten|caption)']
handler.tags = ['tools']
handler.command = /^(resize)$/i

module.exports = handler
