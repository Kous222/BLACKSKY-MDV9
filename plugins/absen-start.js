let handler = async (m, { conn, usedPrefix, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        throw `_*Masih gibt absen in chat dies!*_\n\n*${usedPrefix}löschenabsen* - für menglöschen absen`
    }
    conn.absen[id] = [
        m.reply(`erfolgreich mestarten absen!\n\n*${usedPrefix}absen* - für absen\n*${usedPrefix}cekabsen* - für mengecek absen\n*${usedPrefix}löschenabsen* - für menglöschen data absen`),
        [],
        text
    ]
}
handler.help = ['startenabsen [teks]']
handler.tags = ['absen']
handler.command = /^(start|starten)absen$/i
handler.group = true
handler.admin = true
module.exports = handler;