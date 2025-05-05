const fs = require('fs');
const path = require('path');
const { getBalance, addBalance, subtractBalance } = require('../lib/bank'); // Bank functions for MongoDB integration

let reg = 100; // Small win amount

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
    let cooldown = 20000; // 20 Sekunden
    let now = Date.now();

    // User data initialization and loading the bank data
    const id = m.sender.split('@')[0]; // User ID (for MongoDB)
    let user = await Bank.findOne({ userId: id }); // Fetch user from MongoDB

    if (!user) {
        // If the user doesn't exist, create a new user record with a starting balance of 0
        user = new Bank({ userId: id, balance: 0, lastSlot: 0 });
        await user.save();
    }

    let lastslot = user.lastSlot;

    if (now - lastslot < cooldown) {
        throw `⏳ Bitte warte *${msToTime(lastslot + cooldown - now)}*, bevor du erneut spielst.`;
    }

    // Get user balance from the bank system
    let balance = await getBalance(id);

    if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
    if (balance < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

    // Update the last slot time
    user.lastSlot = now;
    await user.save();

    const emojis = ["🍒", "🍋", "🍇", "⭐", "💎"];
    let x = [], y = [], z = [];

    const slotImagePath = path.join(__dirname, '../gifs/slot.png');
    if (!fs.existsSync(slotImagePath)) {
        throw '❌ Slot-Bild nicht gefunden. Bitte stelle sicher, dass eine Datei namens *slot.png* im Ordner */gifs/* existiert.';
    }

    // Generate slot results
    for (let i = 0; i < 3; i++) {
        x[i] = rand(emojis);
        y[i] = rand(emojis);
        z[i] = rand(emojis);
    }

    let resultMessage;
    if (x[1] === y[1] && y[1] === z[1]) {
        await addBalance(id, bet * 2); // Add to the user's balance for a big win
        resultMessage = `🎉 *Großer Gewinn!*\n\nGewinn: ➡️ *${bet * 2}* MONEY\nNeuer Kontostand: ➡️ *${await getBalance(id)}* MONEY`;
    } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1] || x[0] === y[1] || y[1] === z[2]) {
        await addBalance(id, reg); // Add a smaller win to the user's balance
        resultMessage = `✨ *Kleiner Gewinn!*\n\nGewinn: ➡️ *${reg}* MONEY\nNeuer Kontostand: ➡️ *${await getBalance(id)}* MONEY`;
    } else {
        await subtractBalance(id, bet); // Subtract from balance on a loss
        resultMessage = `💔 *Verloren!*\n\nVerlust: ➡️ *${bet}* MONEY\nNeuer Kontostand: ➡️ *${await getBalance(id)}* MONEY`;
    }

    // Send result image and message to the chat
    await conn.sendMessage(m.chat, {
        image: { url: slotImagePath },
        caption: `🎰 *BLACKSKY-MD SLOT Result*\n\n${formatSlot(x, y, z)}\n\n${resultMessage}`
    });
}

handler.help = ['slot <betrag>'];
handler.tags = ['spiel'];
handler.command = ['slot'];
handler.group = true;
handler.rpg = true;

module.exports = handler;

// Helper functions
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
