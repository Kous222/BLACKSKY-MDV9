const pets = ['katze', 'hund', 'wolf', 'phönix', 'fuchs']

let handler = async (m, { conn, text: txt, usedPrefix, participants }) => {
    conn.battlepet = conn.battlepet ? conn.battlepet : {}
    let text = (txt || '').toLowerCase()
    let id = 'battle-' + m.sender
    let user = global.db.data.users[m.sender]
    let Gegenstand = pets.filter(v => v in user && typeof user[v] == 'number')
    if (!Gegenstand.includes(text)) return m.reply(`Liste deiner Haustiere:\n${pets.map(v => `• ${v}`).join('\n')}`)
    if (user[text] == 0) return m.reply('Du besitzt dieses Haustier nicht!')
    if (typeof conn.battlepet[id] != "undefined" && conn.battlepet[id] == true) return m.reply(`Du befindest dich bereits in einem Haustierkampf.`)

    let users = participants.map(u => u.id)
    let Gegner
    Gegner = users[Math.floor(users.length * Math.random())]

    while (typeof global.db.data.users[Gegner] == "undefined" || Gegner == m.sender) {
        Gegner = users[Math.floor(users.length * Math.random())]
    }

    m.reply(`*Du* (${text} Stufe ${user[text]}) forderst *@${conn.getName(Gegner)}* (${text} Stufe ${global.db.data.users[Gegner][text]}) zu einem Kampf heraus.\n\nWarte 5 Minuten, um das Ergebnis zu sehen.`)
    conn.battlepet[id] = true

    await delay(300000)

    let chancen = []
    for (let i = 0; i < user[text]; i++) chancen.push(m.sender)
    for (let i = 0; i < global.db.data.users[Gegner][text]; i++) chancen.push(Gegner)

    let punkteSpieler = 0
    let punkteGegner = 0
    for (let i = 0; i < 10; i++) {
        let gewählt = getRandom(0, chancen.length - 1)
        if (chancen[gewählt] == m.sender) punkteSpieler += 1
        else punkteGegner += 1
    }

    if (punkteSpieler > punkteGegner) {
        let belohnung = (punkteSpieler - punkteGegner) * 10000
        user.Münzen += belohnung
        user.limit += 1
        m.reply(`*${conn.getName(m.sender)}* [${punkteSpieler * 10}] - [${punkteGegner * 10}] *${conn.getName(Gegner)}*\n\n*Du* (${text} Stufe ${user[text]}) hast gegen *${conn.getName(Gegner)}* (${text} Stufe ${global.db.data.users[Gegner][text]}) gewonnen, weil du ${alasanMenang[getRandom(0, alasanMenang.length - 1)]} bist.\n\nBelohnung: ${belohnung.toLocaleString()} Münzen\n+1 Limit`)
    } else if (punkteSpieler < punkteGegner) {
        let strafe = (punkteGegner - punkteSpieler) * 100000
        user.Münzen -= strafe
        user.limit += 1
        m.reply(`*${conn.getName(m.sender)}* [${punkteSpieler * 10}] - [${punkteGegner * 10}] *${conn.getName(Gegner)}*\n\n*Du* (${text} Stufe ${user[text]}) hast gegen *${conn.getName(Gegner)}* (${text} Stufe ${global.db.data.users[Gegner][text]}) verloren, weil du ${alasanKalah[getRandom(0, alasanKalah.length - 1)]} bist.\n\nDu hast ${strafe.toLocaleString()} Münzen verloren\n+1 Limit`)
    } else {
        m.reply(`*${conn.getName(m.sender)}* [${punkteSpieler * 10}] - [${punkteGegner * 10}] *${conn.getName(Gegner)}*\n\nUnentschieden! Keiner gewinnt oder verliert etwas.`)
    }

    delete conn.battlepet[id]
}

handler.help = ['battlepet']
handler.tags = ['rpg']
handler.command = /^(battlepet)$/i
handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler

function getRandom(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const alasanKalah = ['ein Noob bist', 'zu schwach warst', 'weniger trainiert hast', 'eine schlechte Strategie hattest', 'verloren hast', 'ein schlechtes Haustier hattest', 'eine niedrige Stufe hattest']
const alasanMenang = ['sehr stark bist', 'ein Profi bist', 'alles perfekt gemacht hast', 'ein Legende bist', 'mega trainiert hast', 'dein Pet gut ausgebildet hast']

const delay = time => new Promise(res => setTimeout(res, time));
