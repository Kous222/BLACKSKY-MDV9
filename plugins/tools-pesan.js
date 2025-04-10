let handler = async(m, { conn, Text, usedPrefix }) => {
let [number, Nachricht] = Text.split `|`

    if (!number) return conn.Antworten(m.chat, 'Bitte masukan nomor das/der/die wird disenden\n_Contoh : .Nachricht 6281395861695|hallo Bang_', m)
    if (!Nachricht) return conn.Antworten(m.chat, 'Bitte masukan nachrichtnya\n_Contoh : .Nachricht 6281395861695|hallo Bang_', m)
    if (Text > 500) return conn.Antworten(m.chat, 'Text Kepanjangan!', m)
    
    let user = global.db.data.users[m.sender]

    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `*「 PENITIPAN Nachricht 」*\n\nUntuk : wa.me/${korban}\nPesan : ${Nachricht}\n\n*${global.wm}*`

    conn.Antworten(korban + '@s.whatsapp.net', spam1, m)

    let logs = `[ ✔️ ] Erfolgreich Senden Nachricht wa zu nomor wa.me/${korban}`
    conn.Antworten(m.chat, logs, m)
}
handler.command = /^(Nachricht|chat)$/i
handler.rowner = false
handler.limit = false
handler.Premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = false

module.exports = handler