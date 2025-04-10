const { MessageType } = require("@adiwajshing/baileys")

async function handler(m, { command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) throw 'Du befindest dich gerade nicht in einem anonymen Chat'
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) conn.sendMessage(other, 'Partner hat den Chat verlassen',{quoted:m})
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) throw 'Du befindest dich bereits in einem anonymen Chat'
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                conn.send2But(room.a,'Partner gefunden', wm, 'verlassen', '.leave', 'nächster', '.next', m)
                room.b = m.sender
                room.state = 'CHATTING'
                conn.send2But(room.b,'Partner gefunden', wm, 'verlassen', '.leave', 'nächster', '.next', m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                m.reply('Warte auf anonymen Chat-Partner...')
            }
            break
        }
    }
}
handler.help = ['start', 'starten', 'beginnen', 'leave', 'verlassen', 'beenden', 'next', 'nächster', 'weiter']
handler.tags = 'anonym'

handler.command = ['start', 'starten', 'beginnen', 'leave', 'verlassen', 'beenden', 'next', 'nächster', 'weiter']
handler.private = true

module.exports = handler
