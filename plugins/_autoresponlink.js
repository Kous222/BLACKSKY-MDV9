let fs = require('fs')
let handler = m => m

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Einladung zum Beitritt') || m.text.startsWith('Öffne diesen Link')) && !m.isBaileys && !m.isGroup) {
    let teks = `Gruppeneinladung
• 30 Tage / 10€
Bei Interesse kontaktiere: @${global.owner[0]} für eine Bestellung :)
`
    this.reply(m.chat, teks, m)
    const data = global.owner.filter(([id, isCreator]) => id && isCreator)
    this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
    }
}

module.exports = handler