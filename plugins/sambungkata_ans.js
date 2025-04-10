const { sKata, cKata } = require('../lib/sambung-Wort')

let handler = m => m

handler.before = async function (m, { conn }) {
    this.skata = this.skata || {}
    let id = m.chat
    if (!(id in this.skata)) return true
    let room = this.skata[id]
    let users = db.data.users
    let _kata = await genKata()
    let member = room.player
    let Bonus = rwd(500, 600)
    
    function mmr(type, jid) {
        let user = db.data.users[jid]
        if (type === 'win') {
            return user.skata > 5000 ? rwd(5, 9) : user.skata > 3000 ? rwd(5, 10) : user.skata > 1500 ? rwd(10, 15) : user.skata > 1000 ? rwd(15, 20) : user.skata > 500 ? rwd(20, 30) : rwd(30, 50)
        } else {
            return user.skata > 8000 ? rwd(35, 50) : user.skata > 5000 ? rwd(25, 30) : user.skata > 3000 ? rwd(20, 25) : user.skata > 1500 ? rwd(15, 19) : user.skata > 1000 ? rwd(10, 14) : user.skata > 500 ? rwd(5, 9) : rwd(1, 5)
        }
    }

    if (room.new) {
        if (!/nextkata/i.test(m.text)) return true
        room.new = false
        room.killer = false
        room.Wort = _kata
        room.chat = await this.reply(m.chat, `Saatnya @${room.curr.split('@')[0]}\nStarten : *${_kata.toUpperCase()}*\n*${room.filter(_kata).toUpperCase()}... ?*\nJawab mit mengetik langsung!\n"nyerah" für menyerah`, 0, { contextInfo: { mentionedJid: member } })
    }

    if (room.curr == m.sender) {
        if (/nyerah/i.test(m.text)) {
            let lose_skata = mmr('lose', room.curr)
            let win_skata = room.killer ? mmr('win', room.killer) : 0
            users[room.curr].skata -= lose_skata
            if (room.killer) users[room.killer].skata += win_skata
            room.eliminated.push(room.curr)
            room.player = room.player.filter(p => p !== room.curr)
            room.curr = room.player.length ? room.player[0] : null
            if (room.player.length == 1) {
                users[room.player[0]].exp += room.win_point
                delete this.skata[id]
                return this.reply(m.chat, `@${room.player[0].split('@')[0]} erfolgreich überleben\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: room.player } })
            }
            room.new = true
            return this.reply(m.chat, `@${m.sender.split('@')[0]} menyerah!`, m, { contextInfo: { mentionedJid: [m.sender] } })
        }
        
        let answerF = m.text.toLowerCase().trim().replace(/[^a-z]/gi, '')
        let checkF = await cKata(m.text.toLowerCase().split` `[0])
        if (!answerF.startsWith(room.filter(room.Wort)) || !checkF.Status || room.basi.includes(answerF)) {
            return m.reply(`👎 *Falsch!*
Antwort nicht valid oder bereits benutzt!`)
        }
        
        clearTimeout(room.Zeit)
        users[m.sender].exp += Bonus
        room.basi.push(answerF)
        room.win_point += 200
        room.Wort = answerF
        let nextIndex = (room.player.indexOf(room.curr) + 1) % room.player.length
        room.curr = room.player[nextIndex]
        room.chat = await this.reply(m.chat, `👍+${Bonus}XP\nGiliran @${room.curr.split('@')[0]}\n*${room.filter(answerF).toUpperCase()}... ?*\nJawab mit mengetik langsung!\n"nyerah" für menyerah`, m, { contextInfo: { mentionedJid: member } })
    } else {
        if (room.Status === 'play') {
            return m.reply(room.eliminated.includes(m.sender) ? `du bereits tereliminasi!` : `_Bukan giliranmu!_`)
        }
    }
    return true
}

module.exports = handler

async function genKata() {
    let json = await sKata()
    return json.Wort.length >= 3 ? json.Wort : await genKata()
}

function rwd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
