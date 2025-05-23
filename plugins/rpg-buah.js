let handler = async (m, { conn, usedPrefix }) => {
let user = global.db.data.users[m.sender]
let buah = `GUDANG BUAH

🍌 ${user.pisang} Pisang
🍇 ${user.anggur} Anggur 
🥭 ${user.mangga} Mangga
🍊 ${user.jeruk} Jeruk
🍎 ${user.apel} Apel

benutzen Command ${usedPrefix}sell für verkaufen Buah !`
conn.reply(m.chat, buah, m)
}
handler.help = ['buah']
handler.tags = ['rpg']
handler.command = /^(buah|listbuah)$/i
handler.rpg = true

module.exports = handler