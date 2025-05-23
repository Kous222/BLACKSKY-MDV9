let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*Nein gibt absen stattfinden digrup dies!*_\n\n*${usedPrefix}startenabsen* - für mestarten absen`
    delete conn.absen[id]
    m.reply(`Done!`)
}
handler.help = ['löschenabsen']
handler.tags = ['absen']
handler.command = /^(delete|löschen)absen$/i
handler.group = true
handler.admin = true
module.exports = handler;