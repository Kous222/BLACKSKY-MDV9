let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw `tag orangnya!`
    if (!global.owner.includes(who.split`@`[0])) throw 'er/sie ist kein Owner !'
    let index = global.owner.indexOf(who.split`@`[0])
    global.owner.splice(index, 1)
    conn.reply(m.chat, `@${who.split`@`[0]} jetzt nicht owner wieder !`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })
}
handler.help = ['delowner [@user]']
handler.tags = ['owner']
handler.command = /^(del|löschen|-)owner$/i
handler.owner = true
module.exports = handler
