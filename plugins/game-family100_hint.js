const similarity = require('similarity')
const threshold = 0.72 
let rewardAmount = 1000 //Belohnung in Münzen für jede richtige Antwort

module.exports = {
    async before(m) {
        this.family = this.family ? this.family : {}
        let id = m.chat
        if (!(id in this.family)) return 
        let room = this.family[id] 
        if (room.Antwort == undefined) {
            delete this.family[id]
            return !0
        }
        let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
        if (!room) return !0

        if (text === 'aufgeben' || text === 'beenden' || text === 'abbrechen') {
            let allAnswers = room.Antwort.map((Antwort, index) => `(${index + 1}) ${Antwort}`).join('\n')
            this.reply(m.chat, `Spiel beendet wegen Aufgabe.\n\nDie richtigen Antworten:\n${allAnswers}`, room.msg)
            clearTimeout(room.timeout)
            delete this.family[id]
            return !0
        }

        let index = room.Antwort.indexOf(text)
        if (index < 0) {
            if (Math.max(...room.Antwort.filter((_, index) => !room.beantwortet[index]).map(Antwort => similarity(Antwort, text))) >= threshold) m.reply('Fast richtig!')
                else m.reply(`*Falsch!*`)
            return !0
        }
        if (room.beantwortet[index]) return !0
        let users = global.db.data.users[m.sender]
        room.beantwortet[index] = m.sender
        users.Münzen += rewardAmount 

        let isWin = room.beantwortet.length === room.beantwortet.filter(v => v).length
        let caption = `
*Frage:* ${room.FRAGE}

Es gibt *${room.Antwort.length}* Antworten${room.Antwort.find(v => v.includes(' ')) ? `
(einige Antworten enthalten Leerzeichen)
`: ''}
${isWin ? `*ALLE ANTWORTEN GEFUNDEN*\nGlückwunsch, Sie haben alle Antworten richtig erraten!` : ''}
${Array.from(room.Antwort, (Antwort, index) => {
            return room.beantwortet[index] ? `(${index + 1}) ${Antwort} ${room.beantwortet[index] ? '@' + room.beantwortet[index].split('@')[0] : ''}`.trim() : false
        }).filter(v => v).join('\n')}

+${rewardAmount} Münzen für jede richtige Antwort
    `.trim()
    
        if (this.family[id].msg_old) await this.sendMessage(m.chat, { delete: this.family[id].msg_old.key }).catch(e => e)
        let msg_old = await this.reply(m.chat, caption, m).then(msg => {
            return this.family[id].msg = msg
        }).catch(_ => _)
        this.family[id].msg_old = msg_old

        if (isWin) {
            clearTimeout(room.timeout)
            setTimeout(() => {
                this.sendMessage(m.chat, { delete: this.family[id].msg.key }).catch(e => e)
                delete this.family[id]
            }, 10000)
        }
        return !0
    }
}

//danaputra_133
