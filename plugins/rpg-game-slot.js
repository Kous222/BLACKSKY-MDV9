<<<<<<< HEAD
const fs = require('fs');
const path = require('path');
=======
const mongoose = require('mongoose');
const { initUser, getBalance, addBalance, subtractBalance } = require('../lib/bank'); // Bankfunktionen importieren
const fs = require('fs');
const path = require('path');
const ms = require('ms'); // Make sure you have this library installed (npm install ms)

// MongoDB Schema für Benutzer erstellen
const userSchema = new mongoose.Schema({
    sender: String,
    balance: { type: Number, default: 0 },
    lastslot: { type: Number, default: 0 },
});

// Avoid overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);
>>>>>>> fc7a41b (Erster Commit)

let reg = 100; // Kleiner Gewinnbetrag

let handler = async (m, { conn, args, usedPrefix, command }) => {
<<<<<<< HEAD
    try {
        let infoText = `
=======
    let infoText = `
>>>>>>> fc7a41b (Erster Commit)
🎰 *BLACKSKY-MD SLOT*

Wie viel möchtest du setzen?

📌 *Beispiel:* 
${usedPrefix + command} 100
    `.trim();

<<<<<<< HEAD
        if (!args[0]) throw infoText;
        if (isNaN(args[0])) throw '❌ Bitte gib eine gültige Zahl als Einsatz an.';
        
        let bet = parseInt(args[0]);
        let cooldown = 20000; // 20 Sekunden
        let now = Date.now();

        // Userdaten initialisieren
        if (!global.db.data.users) throw '📂 Datenbank nicht initialisiert!';
        let user = global.db.data.users[m.sender];
        if (!user) {
            user = global.db.data.users[m.sender] = {
                exp: 0,
                limit: 10,
                lastclaim: 0,
                registered: false,
                name: conn.getName(m.sender),
                age: -1,
                regTime: -1,
                afk: -1,
                afkReason: '',
                banned: false,
                level: 0,
                role: 'Rekrut ㋡',
                autolevelup: true,
                dailyXP: 0,
                lastDailyReset: 0,
                totalMessages: 0,
                money: 0,
                lastDaily: 0
            };
        }

        let lastslot = user.lastslot || 0;
        let balance = user.money; // Bankkonto des Benutzers

        let remainingCooldown = now - lastslot < cooldown;
        if (remainingCooldown) {
            throw `⏳ Bitte warte *${msToTime(lastslot + cooldown - now)}*, bevor du erneut spielst.`;
        }

        if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
        if (balance < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

        global.db.data.users[m.sender].lastslot = now;

        const emojis = ["🍒", "🍋", "🍇", "⭐", "💎"];
        let x = [], y = [], z = [];

        const slotImagePath = path.join(__dirname, '../gifs/slot.png');
        if (!fs.existsSync(slotImagePath)) {
            throw '❌ Slot-Bild nicht gefunden. Bitte stelle sicher, dass eine Datei namens *slot.png* im Ordner */gifs/* existiert.';
        }

        // Slot-Ergebnis erzeugen
        for (let i = 0; i < 3; i++) {
            x[i] = rand(emojis);
            y[i] = rand(emojis);
            z[i] = rand(emojis);
        }

        let resultMessage;
        if (x[1] === y[1] && y[1] === z[1]) {
            user.money += bet * 2; // Großer Gewinn
            resultMessage = `🎉 *Großer Gewinn!*\n\nGewinn: ➡️ *${bet * 2}* MONEY\nNeuer Kontostand: ➡️ *${user.money}* MONEY`;
        } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1] || x[0] === y[1] || y[1] === z[2]) {
            user.money += reg; // Kleiner Gewinn
            resultMessage = `✨ *Kleiner Gewinn!*\n\nGewinn: ➡️ *${reg}* MONEY\nNeuer Kontostand: ➡️ *${user.money}* MONEY`;
        } else {
            user.money -= bet; // Verlust
            resultMessage = `💔 *Verloren!*\n\nVerlust: ➡️ *${bet}* MONEY\nNeuer Kontostand: ➡️ *${user.money}* MONEY`;
        }

        await conn.sendMessage(m.chat, {
            image: { url: slotImagePath },
            caption: `🎰 *BLACKSKY-MD SLOT Result*\n\n${formatSlot(x, y, z)}\n\n${resultMessage}`
        });
    } catch (e) {
        console.error('Fehler im Slot-Plugin:', e);
        m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
    }
=======
    if (!args[0]) throw infoText;
    if (isNaN(args[0])) throw '❌ Bitte gib eine gültige Zahl als Einsatz an.';
    
    let bet = parseInt(args[0]);
    let cooldown = 20000; // 20 Sekunden
    let now = Date.now();

    // Benutzer in der MongoDB-Datenbank suchen oder erstellen
    let user = await User.findOne({ sender: m.sender });
    if (!user) {
        user = new User({ sender: m.sender });
        await user.save();
    }

    let lastslot = user.lastslot;

    if (now - lastslot < cooldown) {
        throw `⏳ Bitte warte *${ms(lastslot + cooldown - now)}*, bevor du erneut spielst.`;
    }

    let balance = await getBalance(m.sender);

    if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
    if (balance < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

    user.lastslot = now; // Aktualisieren des Zeitstempels für das letzte Spiel
    await user.save();

    const emojis = ["🍒", "🍋", "🍇", "⭐", "💎"];
    let x = [], y = [], z = [];

    const slotImagePath = path.join(__dirname, '../gifs/slot.png');
    if (!fs.existsSync(slotImagePath)) {
        throw '❌ Slot-Bild nicht gefunden. Bitte stelle sicher, dass eine Datei namens *slot.png* im Ordner */gifs/* existiert.';
    }

    // Slot-Ergebnis erzeugen
    for (let i = 0; i < 3; i++) {
        x[i] = rand(emojis);
        y[i] = rand(emojis);
        z[i] = rand(emojis);
    }

    let resultMessage;
    if (x[1] === y[1] && y[1] === z[1]) {
        await addBalance(m.sender, bet * 2);
        resultMessage = `🎉 *Großer Gewinn!*\n\nGewinn: ➡️ *${bet * 2}* MONEY\nNeuer Kontostand: ➡️ *${await getBalance(m.sender)}* MONEY`;
    } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1] || x[0] === y[1] || y[1] === z[2]) {
        await addBalance(m.sender, reg);
        resultMessage = `✨ *Kleiner Gewinn!*\n\nGewinn: ➡️ *${reg}* MONEY\nNeuer Kontostand: ➡️ *${await getBalance(m.sender)}* MONEY`;
    } else {
        await subtractBalance(m.sender, bet);
        resultMessage = `💔 *Verloren!*\n\nVerlust: ➡️ *${bet}* MONEY\nNeuer Kontostand: ➡️ *${await getBalance(m.sender)}* MONEY`;
    }

    await conn.sendMessage(m.chat, {
        image: { url: slotImagePath },
        caption: `🎰 *BLACKSKY-MD SLOT Result*\n\n${formatSlot(x, y, z)}\n\n${resultMessage}`
    });
>>>>>>> fc7a41b (Erster Commit)
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
