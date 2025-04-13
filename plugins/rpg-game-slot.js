let reg = 100

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let infoText = `
🎰 *Slot Game – Gacha Money*

Wie viel möchtest du setzen?

📌 *Beispiel:* 
${usedPrefix + command} 100
    `.trim()

    if (!args[0]) throw infoText
    if (isNaN(args[0])) throw '❌ Bitte gib eine gültige Zahl als Einsatz an.'
    
    let bet = parseInt(args[0])
    let user = global.db.data.users[m.sender]
    let cooldown = 20000 // 20 Sekunden
    let now = new Date * 1

    if (now - user.lastslot < cooldown)
        throw `⏳ Bitte warte *${msToTime(user.lastslot + cooldown - now)}*, bevor du erneut spielst.`

    if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.'
    if (user.Münzen < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`

    user.lastslot = now

    const emojis = ["🍒", "🍋", "🍇", "⭐", "💎"]
    let x = [], y = [], z = []

    let msg = await m.reply('🎰 Slot wird gestartet...')

    for (let i = 0; i < 3; i++) {
        x[i] = rand(emojis)
        y[i] = rand(emojis)
        z[i] = rand(emojis)
    }

    for (let spin = 0; spin < 5; spin++) {
        x = [rand(emojis), rand(emojis), rand(emojis)]
        y = [rand(emojis), rand(emojis), rand(emojis)]
        z = [rand(emojis), rand(emojis), rand(emojis)]

        await delay(800)
        await conn.sendMessage(m.chat, {
            text: formatSlot(x, y, z),
            edit: msg.key
        })
    }

    let resultMessage
    if (x[1] === y[1] && y[1] === z[1]) {
        user.Münzen += bet * 2
        resultMessage = `🎉 *JACKPOT!* Du hast *${bet * 2} MONEY* gewonnen!`
    } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1]) {
        user.Münzen += reg
        resultMessage = `✨ Guter Versuch! Du erhältst *${reg} MONEY* als Trostpreis.`
    } else {
        user.Münzen -= bet
        resultMessage = `💔 Leider verloren! Du verlierst *${bet} MONEY*.`
    }

    await conn.sendMessage(m.chat, {
        text: formatSlot(x, y, z),
        edit: msg.key
    })
    await m.reply(resultMessage)
}

handler.help = ['slot <betrag>']
handler.tags = ['spiel']
handler.command = ['slot']
handler.group = true
handler.rpg = true

module.exports = handler

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms))
}

function formatSlot(x, y, z) {
    return `
🎰 ┃ *Gacha Money*
╭───────────────
│ ${x[0]} : ${y[0]} : ${z[0]}
│ ${x[1]} : ${y[1]} : ${z[1]}
│ ${x[2]} : ${y[2]} : ${z[2]}
╰───────────────
        🎰┃🎰┃🎰
`.trim()
}

function msToTime(ms) {
    let sec = Math.floor(ms / 1000)
    return `${sec} Sekunde${sec !== 1 ? 'n' : ''}`
}
up = true
handler.rpg = true

module.exports = handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return seconds + " Sekunden"
}
