let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
    let buffer = await fetch(`https://telegra.ph/file/99d0a7706c94210faff75.jpg`).then(res => res.buffer())
    conn.sendFile(m.chat, buffer, 'result.jpg', `*Wenn hat durchführen pembayaran bitte sendenkan bukti pembayaran zu WhatsApp Owner.*`, m)
}

handler.help = handler.command = ['spende','donate','sewa','sewabot','belibot']
handler.tags = ['spielen']
module.exports = handler
