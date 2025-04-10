const similarity = require('similarity')
const threshold = 0.72 // je höher der Wert, desto ähnlicher müssen die Antworten sein
module.exports = {
    async before(m) {
        this.family = this.family ? this.family : {}
        let id = m.chat
        if (!(id in this.family)) return !0
        let room = this.family[id]
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
            return !0
        }
        if (room.beantwortet[index]) return !0
        let users = global.db.data.users[m.sender]
        room.beantwortet[index] = m.sender
        users.Münzen += room.rewardAmount 

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

+${room.rewardAmount} Münzen für jede richtige Antwort
    `.trim()
        m.reply(caption, null, {
            contextInfo: {
                mentionedJid: this.parseMention(caption)
            }
        }).then(msg => {
            return this.family[id].msg = msg
        }).catch(_ => _)
        if (isWin) {
            clearTimeout(room.timeout)
            delete this.family[id]
        }
        return !0
    }
}