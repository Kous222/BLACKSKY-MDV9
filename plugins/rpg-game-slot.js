let reg = 100
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `
Wie viel möchtest du setzen?

📌 Beispiel :
*${usedPrefix + command}* 100`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let apuesta = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 20000 // 20 Sekunden Cooldown
    if (new Date - users.lastslot < 20000) throw `⏳ Warte *${msToTime(time - new Date())}* bis du es wieder verwenden kannst`
    if (apuesta < 100) throw '✳️ Setze mindestens *100 MONEY*, um fortzufahren'
    if (users.Münzen < apuesta) {
        throw `✳️ Du hast nicht genug *MONEY*\nÜberprüfe dein MONEY mit *.balance*`
    }

    // Setze die Cooldown-Zeit zu Beginn
    users.lastslot = new Date * 1

    let emojis = ["🕊️", "🦀", "🦎"];
    let x = [],
        y = [],
        z = [];
    let key = await m.reply('Slot wird gedreht...');

    for (let i = 0; i < 3; i++) {
        x[i] = emojis[Math.floor(Math.random() * emojis.length)];
        y[i] = emojis[Math.floor(Math.random() * emojis.length)];
        z[i] = emojis[Math.floor(Math.random() * emojis.length)];
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            x[j] = emojis[Math.floor(Math.random() * emojis.length)];
            y[j] = emojis[Math.floor(Math.random() * emojis.length)];
            z[j] = emojis[Math.floor(Math.random() * emojis.length)];
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { text: `
       🎰 ┃ *Gacha Money* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰
        `, bearbeiten: key });
    }

    let end;
    if (x[1] == y[1] && y[1] == z[1]) {
        end = `🎁 *JACKPOT!!!* DU HAST GEWONNEN\n *+${apuesta + apuesta} MONEY*`
        users.Münzen += apuesta + apuesta
    } else if (x[1] == y[1] || x[1] == z[1] || y[1] == z[1]) {
        end = `🔮 Weiter so, noch nicht gewonnen, versuch es noch einmal 💲💲 \nZusätzlich *+${reg} MONEY*`
        users.Münzen += reg
    } else {
        end = `😔 Leider verloren *-${apuesta} MONEY*`
        users.Münzen -= apuesta
    }
    await conn.sendMessage(m.chat, { text: `
       🎰 ┃ *Gacha Money* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰
        `, bearbeiten: key });
    return await m.reply(end);
}
handler.help = ['slot <apuesta>']
handler.tags = ['spiel']
handler.command = ['slot']
handler.group = true
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
