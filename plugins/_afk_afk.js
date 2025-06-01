let handler = async (m, { text }) => {
let user = global.db.data.users[m.sender]
user.afk = + new Date
user.afkReason = text
m.reply(`@${m.sender.split`@`[0]} ist jetzt AFK ${text ? '\nMit Grund: ' + text : 'Ohne Grund'}
`)
}
handler.help = ['afk [grund]']
handler.tags = ['spielen']
handler.command = /^afk$/i

module.exports = handler
//@${who.split`@`[0]}        /////@${m.sender.split`@`[0]