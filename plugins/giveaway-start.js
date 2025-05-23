let handler = async (m, { usedPrefix, text, command, participants  }) => {
    conn.giveway = conn.giveway ? conn.giveway : {}
    let id = m.chat
    let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
	if (!text) throw `Example : ${usedPrefix + command} GIVEAWAY BOKEP 500TB`
    if (id in conn.giveway) {
        throw `_*Masih gibt GIVEAWAY in chat dies!*_`
    }
    let capt = `erfolgreich mestarten giveaway!\n\n*${usedPrefix}ikut* - für ikut giveaway\n*${usedPrefix}cekgiveaway* - für cek das/der/die ikut\n*${usedPrefix}rollgiveaway* - für mensuchen pemenang\n*${usedPrefix}deletegiveaway* - für löschen giveaway\n\n*INFORMATION:*\n\n${text}`
    conn.giveway[id] = [
        conn.sendMessage(m.chat, { text: capt, mentions: participants.map(a => a.id) }),
                [],
        text
    ]
}
handler.help = ['startengiveaway'].map(v => v + ' <text>')
handler.tags = ['adminry', 'group']
handler.command = /^(start|starten)giveaway$/i
handler.group = true
handler.admin = true
module.exports = handler