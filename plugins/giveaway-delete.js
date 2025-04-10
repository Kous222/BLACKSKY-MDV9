
let handler = async (m, { conn, participants, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) throw `_*Nein gibt GIVEAWAY stattfinden digrup dies!*_\n\n*${usedPrefix}startengiveaway* - für mestarten giveaway`
    delete conn.giveway[id]
    conn.sendMessage(m.chat, { text: '*GIVEAWAY* hat fertig', mentions: participants.map(a => a.id) })
}
handler.help = ['löschengiveaway']
handler.tags = ['adminry', 'group']
handler.command = /^(delete|löschen)giveaway$/i
handler.group = true
handler.admin = true
module.exports = handler
