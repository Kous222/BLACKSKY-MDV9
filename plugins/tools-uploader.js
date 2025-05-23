const hochladenFile = require('../lib/hochladenFile')
const hochladenImage = require('../lib/hochladenImage')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Nein gibt medien das/der/die Gefunden'
  let medien = await q.Herunterladen()
  let isTele = /Bild\/(png|jpe?g|gif)|Video\/mp4/.test(mime)
  let fileSizeLimit = 5 * 1024 * 1024 
  if (medien.length > fileSizeLimit) {
    throw 'größe medien nicht darf melebihi 5MB'
  }
  let Link = await (isTele ? hochladenImage : hochladenFile)(medien)
  m.Antworten(`${Link}
${medien.length} Byte(s)
${isTele ? '(Nein Gibt Tanggal Kedaluwarsa)' : '(Expired 24 hours)'}`)
}
handler.help = ['tourl <Antworten Bild>']
handler.tags = ['Sticker']
handler.command = /^(Hochladen|tourl)$/i

module.exports = handler
