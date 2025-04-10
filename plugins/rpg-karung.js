let handler = async (m, { conn, usedPrefix }) => {
        let user = global.db.data.users[m.sender]
        let cap = `*━ ❨ Sammelsack Inhalt ❩ ━*

=> *Dein Sammelsack :*  @${m.sender.split`@`[0]}

*Dosen = [ ${user.kaleng} ]*
*Flaschen = [ ${user.botol} ]*
*Karton = [ ${user.kardus} ]*
*Müll = [ ${user.müll} ]*

Benutze *${usedPrefix}sell* zum Verkaufen`

        conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) } )
}

handler.help = ['karung', 'sammelsack', 'sack']
handler.tags = ['rpg']
handler.command = /^(karung|sammelsack|sack)$/i
handler.rpg = true

module.exports = handler