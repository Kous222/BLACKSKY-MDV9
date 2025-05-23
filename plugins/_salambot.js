let handler = async (m, { conn, args, command }) => {
    conn.reply(m.chat, `Friede sei auch mit dir`,m)
        }
handler.help = ['Karinn']
handler.tags = ['spielen']
handler.customPrefix = /^(assalamualaikum|friedenseimit|grüßgott)$/i 
handler.command = new RegExp
handler.limit = false
handler.group = false


module.exports = handler