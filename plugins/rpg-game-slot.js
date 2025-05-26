const mongoose = require('mongoose');
const { initUser, getBalance, addBalance, subtractBalance } = require('../lib/bank'); // Bankfunktionen importieren
const fs = require('fs');
const path = require('path');
const ms = require('ms'); // npm install ms

// MongoDB Schema für Benutzer erstellen
const userSchema = new mongoose.Schema({
    sender: String,
    balance: { type: Number, default: 0 },
    lastslot: { type: Number, default: 0 },
});

// Avoid overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);

let reg = 100; // Kleiner Gewinnbetrag

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // RPG-Status prüfen
    if (!global.db.data.settings[conn.user?.jid]?.rpg) {
        throw '❌ Das RPG-System ist derzeit deaktiviert.\n\nAktiviere es mit dem Befehl:\n*.enable rpg*';
    }

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
}

handler.help = ['slot <betrag>'];
handler.tags = ['rpg'];
handler.command = ['slot'];
handler.group = true;
handler.rpg = true;

module.exports = handler;

// Hilfsfunktionen
function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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
