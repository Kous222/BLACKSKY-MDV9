let fs = require('fs')
let fetch = require('node-fetch')
let winScore = 500
let rewardAmount = 100 

async function handler(m) {
    conn.family = conn.family ? conn.family : {}
    let id = m.chat
    if (id in conn.family) {
        if (conn.family[id].id !== undefined) return conn.reply(m.chat, 'Es gibt noch ein ungelöstes Quiz in diesem Chat' + '\nWarte 3 Minuten bis zum Ende', conn.family[id].msg)
        delete conn.family[id]
        throw false
    }
    conn.family[id] = {}
    let src = await (await fetch(`https://api.betabotz.eu.org/api/spiel/family100-2?apikey=${lann}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]

    let caption = `

 ┌─⊷ *FRAGE*
▢ *Frage:* ${json.FRAGE}
▢ Es gibt *${json.Antwort.length}* Antworten${json.Antwort.find(v => v.includes(' ')) ? `
▢ (einige Antworten enthalten Leerzeichen)
▢ warte 3 Minuten bis zum Ende
▢ tippe *aufgeben*, *beenden* oder *abbrechen* um das Spiel zu beenden
└──────────────
`: ''}

+${rewardAmount} Punkte! für jede richtige Antwort
    `.trim()
    conn.family[id] = {
        id,
        msg: await m.reply(caption),
        ...json,
        beantwortet: Array.from(json.Antwort, () => false),
        winScore,
        rewardAmount, 
        timeout: setTimeout(() => {
            if (conn.family[id]) {
                let allAnswers = conn.family[id].Antwort.map((Antwort, index) => `(${index + 1}) ${Antwort}`).join('\n')
                conn.reply(m.chat, `Zeit abgelaufen! Spiel beendet.\n\nDie richtigen Antworten:\n${allAnswers}`, conn.family[id].msg)
                delete conn.family[id]
            }
        }, 180000) // 3 minutes
    }
}
handler.help = ['family100', 'familie100', 'familienquiz']
handler.tags = ['spiel']
handler.group = true
handler.command = /^(family100|familie100|familienquiz)/i

handler.aufgeben = async function (m) {
    let id = m.chat
    if (id in conn.family) {
        conn.reply(m.chat, 'Spiel beendet wegen Aufgabe.', conn.family[id].msg)
        clearTimeout(conn.family[id].timeout)
        delete conn.family[id]
    } else {
        conn.reply(m.chat, 'Es läuft kein Spiel.', m)
    }
}

module.exports = handler

//danaputra_133