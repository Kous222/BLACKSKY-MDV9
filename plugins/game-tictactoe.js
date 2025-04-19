const TicTacToe = require("../lib/tictactoe")

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.spiel = conn.spiel ? conn.spiel : {}
    if (Object.values(conn.spiel).find(room => room.id.startsWith('tictactoe') && [room.spiel.playerX, room.spiel.playerO].includes(m.sender)))
        throw 'Du bist bereits in einem laufenden Spiel.'

    let room = Object.values(conn.spiel).find(room => room.state === 'WAITING' && (text ? room.name === text : true))

    if (room) {
        m.reply('Spielpartner gefunden!')
        room.o = m.chat
        room.spiel.playerO = m.sender
        room.state = 'PLAYING'
        let arr = room.spiel.render().map(v => {
            return {
                X: '❌',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        let str = `
Raum-ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Warte auf Zug von @${room.spiel.currentTurn.split('@')[0]}
Gib *nyerah* ein, um aufzugeben.
`.trim()
        if (room.x !== room.o) m.reply(str, room.x, {
            contextInfo: {
                mentionedJid: conn.parseMention(str)
            }
        })
        m.reply(str, room.o, {
            contextInfo: {
                mentionedJid: conn.parseMention(str)
            }
        })
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            spiel: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        }
        if (text) room.name = text
        m.reply('Warte auf einen Mitspieler... ' + (text ? `Tippe diesen Befehl in einem anderen Chat:\n${usedPrefix}${command} ${text}` : ''))
        conn.spiel[room.id] = room
    }
}

handler.help = ['tictactoe', 'ttt'].map(v => v + ' [benutzerdefinierter Raumname]')
handler.tags = ['spiel']
handler.command = /^(tictactoe|t{3})$/i

module.exports = handler
