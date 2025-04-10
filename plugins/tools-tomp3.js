const { toPTT, toAudio } = require('../lib/converter')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/Video|Audio/.test(mime)) throw `Antworten Video/Audio mit Befehl *${usedPrefix + command}*`
    let medien = await q.Herunterladen()
    if (!medien) throw 'Medien Kann nicht heruntergeladen werden'
    let Audio = await toAudio(medien, 'mp4')
    if (!Audio.data) throw 'Fehlgeschlagen durchführen konversi.'
    conn.sendMessage(m.chat, { Audio: Audio.data, mimetype: 'Audio/mpeg' }, { quoted: m })
}
handler.help = ['toaudio (Antworten)']
handler.tags = ['tools']
handler.command = /^to(a(udio)?)$/i

module.exports = handler
