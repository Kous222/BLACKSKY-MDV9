const fs = require('fs');
const path = require('path');

let reg = 100; // Regulärer Gewinnbetrag

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let infoText = `
🎰 *BLACKSKY-MD SLOT*

Wie viel möchtest du setzen?

📌 *Beispiel:* 
${usedPrefix + command} 100
    `.trim();

    if (!args[0]) throw infoText;
    if (isNaN(args[0])) throw '❌ Bitte gib eine gültige Zahl als Einsatz an.';
    
    let bet = parseInt(args[0]);
    let user = global.db.data.users[m.sender];
    let cooldown = 20000; // 20 Sekunden
    let now = new Date * 1;

    if (now - user.lastslot < cooldown)
        throw `⏳ Bitte warte *${msToTime(user.lastslot + cooldown - now)}*, bevor du erneut spielst.`;

    if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
    if (user.Münzen < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

    user.lastslot = now;

    const emojis = ["🍒", "🍋", "🍇", "⭐", "💎"];
    let x = [], y = [], z = [];

    const slotImagePath = path.join(__dirname, '../gifs/slot.png');
    if (!fs.existsSync(slotImagePath)) {
        throw '❌ Slot-Bild nicht gefunden. Bitte stelle sicher, dass eine Datei namens *slot.png* im Ordner */gifs/* existiert.';
    }

    // Generate the slot result
    for (let i = 0; i < 3; i++) {
        x[i] = rand(emojis);
        y[i] = rand(emojis);
        z[i] = rand(emojis);
    }

    let resultMessage;
    if (x[1] === y[1] && y[1] === z[1]) {
        user.Münzen += bet * 2;
        resultMessage = `🎉 Du hast einen großen Gewinn erzielt!\nGewinn --> *${bet * 2}* MONEY\nWallet --> *${user.Münzen}* MONEY`;
    } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1] || x[0] === y[1] || y[1] === z[2]) {
        user.Münzen += reg;
        resultMessage = `✨ Du hast einen kleinen Gewinn erzielt!\nGewinn --> *${reg}* MONEY\nWallet --> *${user.Münzen}* MONEY`;
    } else {
        user.Münzen -= bet;
        resultMessage = `💔 Leider verloren! Du verlierst *${bet}* MONEY\nWallet --> *${user.Münzen}* MONEY`;
    }

    // Send the result with the slot image
    await conn.sendMessage(m.chat, {
        image: { url: slotImagePath }, // <-- Richtig: Bild wird über Pfad geladen
        caption: `🎰 *BLACKSKY-MD SLOT Result*\n\n${resultMessage}\n\n${formatSlot(x, y, z)}`
    });

    // Bestätigung
    await m.reply(resultMessage);
}

handler.help = ['slot <betrag>'];
handler.tags = ['spiel'];
handler.command = ['slot'];
handler.group = true;
handler.rpg = true;

module.exports = handler;

// Hilfsfunktionen
function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function msToTime(ms) {
    let sec = Math.floor(ms / 1000);
    return `${sec} Sekunde${sec !== 1 ? 'n' : ''}`;
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
`.trim();
}
