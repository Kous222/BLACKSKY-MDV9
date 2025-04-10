const { sticker } = require('../lib/sticker')
const hochladenFile = require('../lib/hochladenFile')
const hochladenImage = require('../lib/hochladenImage')
let { webp2png } = require('../lib/webp2mp4')
let fetch = require("node-fetch")
let handler = async (m, { conn, Text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
if (/Video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.Antworten('Maksimal 10 Sekunden!')
try {
      let img = await q.Herunterladen()
   
if(!img) throw `Antworten Bild/Video/Sticker mit Befehl .Sticker` 
conn.sendImageAsSticker(m.chat , img, m, {packname: Text, author: ''})
    } catch { throw 'Fehlgeschlagen!, Antworten Bild/Video mit caption *.Sticker*'}
}
handler.help = ['wm', 'watermark']
handler.tags = ['Sticker']
handler.command = /^wm|watermark?$/i

module.exports = handler

const isUrl = (Text) => {
  return Text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
