let handler = async (m, { conn, usedPrefix }) => {
let user = global.db.data.users[m.sender]
let buah = `OBSTLAGER

🍌 ${user.pisang} Bananen
🍇 ${user.anggur} Trauben 
🥭 ${user.mangga} Mangos
🍊 ${user.jeruk} Orangen
🍎 ${user.apel} Äpfel

Benutze den Befehl ${usedPrefix}sell um Früchte zu verkaufen!`
conn.reply(m.chat, buah, m)
}
handler.help = ['buah', 'früchte', 'obst', 'fruits']
handler.tags = ['rpg']
handler.command = /^(buah|listbuah|früchte|obst|fruits)$/i
handler.rpg = true

module.exports = handler