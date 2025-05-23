let qrcode = require("qrcode")

let handler = async (m, { conn, Text }) => {
  if (!Text) throw 'teksnya welche?'
  conn.sendFile(m.chat, await qrcode.toDataURL(Text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '', m)
}
handler.help = ['', 'qrcode', 'qrerstellen'].map(v => 'qr' + v + ' <Text>')
handler.tags = ['tools']
handler.command = /^((qr(code)?$|qrcode|qrerstellen)|qrcode|qrerstellen)/i
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
