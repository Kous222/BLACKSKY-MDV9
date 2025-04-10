const items = [ 'Münzen', 'Diamant', 'Gold', 'berlian' ]
let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.judipvp = conn.judipvp ? conn.judipvp : {}
    if (Object.values(conn.judipvp).find(room => room.id.startsWith('judipvp') && [room.p, room.p2].includes(m.sender))) throw 'Selesaikan judi mu die/der/das vorher'
    if (Object.values(conn.judipvp).find(room => room.id.startsWith('judipvp') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `Person die/der/das du tantang gerade spielen judipvp zusammen Person andere :(`
    let Feind = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    let user = global.db.data.users
    let Gegenstand = items.filter(v => v in user[m.sender] && typeof user[m.sender][v] == 'number')
    let type = (args[0] || '').toLowerCase()
    let count = (args[1] && number(parseInt(args[1])) ? Math.max(parseInt(args[1]), 1): /all/i.test(args[1]) ? Math.floor(parseInt(user[type])): 1) * 1
    let id = 'judipvp_' + new Date() * 1
    if (user[m.sender][type] < count) return m.reply(`${type} du nicht genug!`)
    if (!Gegenstand.includes(type)) return m.reply('Item die/der/das verfügbar\n• Money\n• Diamant\n• Gold\n• berlian')
    if (!count || !Feind) return m.reply(`Anmeldenan format mit richtig\n\nBeispiel :\n${usedPrefix + command} Münzen 10000 ${m.sender.split('@')[0]}`)
    conn.judipvp[id] = {
        chat: await conn.reply(m.chat, `@${m.sender.split('@')[0]} Mengajak @${Feind.split('@')[0]} Berjudi Ob du Wollen Menerimanya? (Y/N)`, m, {
            contextInfo: { mentionedJid: [m.sender, Feind] } 
        }),
        id: id,
        p: m.sender,
        p2: Feind,
        type: type,
        Status: 'wait',
        taruhan: count,
        zeit: setTimeout(() => {
            if (conn.judipvp[id]) conn.reply(m.chat, `_Waktu judi habis_`, m)
            delete conn.judipvp[id]
        }, 60000)
    }
}
handler.help = ['judipvp <type> <count> <tag>']
handler.tags = ['rpg']
handler.command = /^(judipvp)$/i
handler.register = true
handler.group = true
handler.rpg = true
module.exports = handler

function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}