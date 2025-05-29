const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ms = require('ms');
const { initUser, getBalance, addBalance, subtractBalance } = require('../lib/bank');

// MongoDB Schema definieren
const userSchema = new mongoose.Schema({
    sender: String,
    balance: { type: Number, default: 0 },
    lastslot: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let reg = 100;

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) {
            return m.reply(`🎰 *BLACKSKY-MD SLOT*\n\nWie viel möchtest du setzen?\n\n📌 *Beispiel:* \n${usedPrefix + command} 100`);
        }

        if (isNaN(args[0])) return m.reply('❌ Bitte gib eine gültige Zahl als Einsatz an.');

        let bet = parseInt(args[0]);
        if (bet < 100) return m.reply('⚠️ Der Mindesteinsatz beträgt *100 MONEY*.');

        let cooldown = 20000;
        let now = Date.now();

        // Benutzer suchen oder anlegen (MongoDB)
        let user = await User.findOne({ sender: m.sender });
        if (!user) {
            user = new User({ sender: m.sender });
            await user.save();
        }

        if (now - user.lastslot < cooldown) {
            return m.reply(`⏳ Bitte warte *${ms(user.lastslot + cooldown - now)}*, bevor du erneut spielst.`);
        }

        let balance = await getBalance(m.sender);
        if (balance < bet) return m.reply(`❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`);

        user.lastslot = now;
        await user.save();

        const emojis = ["🍒", "🍋", "🍇", "⭐", "💎"];
        let x = [], y = [], z = [];

        for (let i = 0; i < 3; i++) {
            x[i] = rand(emojis);
            y[i] = rand(emojis);
            z[i] = rand(emojis);
        }

        const slotImagePath = path.join(__dirname, '../gifs/slot.png');
        if (!fs.existsSync(slotImagePath)) {
            return m.reply('❌ Slot-Bild nicht gefunden. Bitte stelle sicher, dass *slot.png* im Ordner */gifs/* existiert.');
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

    } catch (e) {
        console.error('Fehler im Slot-Plugin:', e);
        m.reply('⚠️ Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
};

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
