const pets = ['kucing', 'anjing', 'serigala', 'phonix', 'rubah']

let handler = async (m, { conn, text: txt, usedPrefix, participants }) => {
    conn.battlepet = conn.battlepet ? conn.battlepet : {}
    let text = (txt || '').toLowerCase()
    let id = 'battle-' + m.sender
    let user = global.db.data.users[m.sender]
    let Gegenstand = pets.filter(v => v in user && typeof user[v] == 'number')
    if (!Gegenstand.includes(text)) return m.reply(`List Pet :\n${pets.map(v => { return `• ${v}` }).join('\n') }`)
    if (user[text] == 0) return m.reply('du Nein haben Pet Dies!')
    if (typeof conn.battlepet[id] != "undefined" && conn.battlepet[id] == true) return m.reply(`du noch befindet sich in battle-pet.`)
    let users = participants.map(u => u.id)
    var Gegner
    Gegner = users[Math.floor(users.length * Math.random())]

    while (typeof global.db.data.users[Gegner] == "undefined" || Gegner == m.sender) {
        Gegner = users[Math.floor(users.length * Math.random())]
    }

    m.reply(`*du* (${text} Stufe ${user[text]}) menantang *'@' +${conn.getName(Gegner)}* (${text} Stufe ${global.db.data.users[Gegner][text]}) und gerade in pertarungan.\n\nTunggu 5 menit wieder und ansehen wer yg gewinnen.`)
    conn.battlepet[id] = true

    await delay(300000)

    let kesempatan = []
    for (let i = 0; i < user[text]; i++) kesempatan.push(m.sender)
    for (let i = 0; i < global.db.data.users[Gegner][text]; i++) kesempatan.push(Gegner)

    let pointPemain = 0
    let pointLawan = 0
    for (let i = 0; i < 10; i++) {
        let unggul = getRandom(0, kesempatan.length - 1)
        if (kesempatan[unggul] == m.sender) pointPemain += 1
        else pointLawan += 1
    }

    if (pointPemain > pointLawan) {
        let Belohnung = (pointPemain - pointLawan) * 10000
        user.Münzen += Belohnung
        user.limit += 1
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(Gegner)}*\n\n*du* (${text} Stufe ${user[text]}) gewinnen gegen *${conn.getName(Gegner)}* (${text} Stufe ${global.db.data.users[Gegner][text]}) weil du ${alasanMenang[getRandom(0, alasanMenang.length - 1)]}\n\nHadiah . ${Belohnung.toLocaleString()}\n+1 Limit`)
    } else if (pointPemain < pointLawan) {
        let denda = (pointLawan - pointPemain) * 100000
        user.Münzen -= denda
        user.limit += 1
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(Gegner)}*\n\n*du* (${text} Stufe ${user[text]}) verlieren gegen *${conn.getName(Gegner)}* (${text} Stufe ${global.db.data.users[Gegner][text]}) weil du ${alasanKalah[getRandom(0, alasanKalah.length - 1)]}\n\nMoney du verringert ${denda.toLocaleString()}\n+1 Limit`)
    } else {
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(Gegner)}*\n\nHasil imbang kak, ga dapet was was`)
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

const alasanKalah = ['Noob', 'Cupu', 'Weniger hebat', 'Ampas kalahan', 'Gembel kalahan', 'Pet Jelek', 'Stufe Klein']
const alasanMenang = ['Hebat', 'Pro', 'Master Spiel', 'Legenda spiel', 'Sehr Pro', 'Rajin Nge-push']

const delay = time => new Promise(res => setTimeout(res, time));