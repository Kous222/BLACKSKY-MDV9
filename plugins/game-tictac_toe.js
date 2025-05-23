let handler = m => m
let debugMode = !1

let winScore = 500
let playScore = 50

handler.before = function (m) {
    let ok
    let isWin = !1
    let isTie = !1
    let isSurrender = !1
    this.spiel = this.spiel ? this.spiel : {}
    let room = Object.values(this.spiel).find(room => room.id && room.spiel && room.state && room.id.startsWith('tictactoe') && [room.spiel.playerX, room.spiel.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
        // m.reply(`[DEBUG]\n${parseInt(m.text)}`)
        if (!/^([1-9]|(me)?nyerah|surr?ender)$/i.test(m.text)) return !0
        isSurrender = !/^[1-9]$/.test(m.text)
        if (m.sender !== room.spiel.currentTurn) { // nek wayahku
            if (!isSurrender) return !0
        }
        if (debugMode) m.reply('[DEBUG]\n' + require('util').format({
            isSurrender,
            text: m.text
        }))
        if (!isSurrender && 1 > (ok = room.spiel.turn(m.sender === room.spiel.playerO, parseInt(m.text) - 1))) {
            m.reply({
                '-3': 'Spiel hat enden',
                '-2': 'Invalid',
                '-1': 'Posisi Invalid',
                0: 'Posisi Invalid',
            }[ok])
            return !0
        }
        if (m.sender === room.spiel.winner) isWin = true
        else if (room.spiel.board === 511) isTie = true
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
        if (isSurrender) {
            room.spiel._currentTurn = m.sender === room.spiel.playerX
            isWin = true
        }
        let winner = isSurrender ? room.spiel.currentTurn : room.spiel.winner
        let str = `
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
${isWin ? `@${winner.split('@')[0]} Gewinnen! (+${winScore} XP)` : isTie ? `Spiel enden (+${playScore} XP)` : `Giliran ${['❌', '⭕'][1 * room.spiel._currentTurn]} (@${room.spiel.currentTurn.split('@')[0]})`}

❌: @${room.spiel.playerX.split('@')[0]}
⭕: @${room.spiel.playerO.split('@')[0]}
Tippe *nyerah* für nyerah
Room id: ${room.id}
`.trim()
        let users = global.db.data.users
        if ((room.spiel._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
            room[room.spiel._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
        if (room.x !== room.o) m.reply(str, room.x, {
            contextInfo: {
                mentionedJid: this.parseMention(str)
            }
        })
        m.reply(str, room.o, {
            contextInfo: {
                mentionedJid: this.parseMention(str)
            }
        })
        if (isTie || isWin) {
            users[room.spiel.playerX].exp += playScore
            users[room.spiel.playerO].exp += playScore
            if (isWin) users[winner].exp += winScore - playScore
            if (debugMode) m.reply('[DEBUG]\n' + require('util').format(room))
            delete this.spiel[room.id]
        }
    }
    return !0
}

module.exports = handler
