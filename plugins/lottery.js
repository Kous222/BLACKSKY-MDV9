const fs = require('fs');
const path = require('path');

let reg = 100; // Kleiner Gewinnbetrag

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let infoText = `
🎰 *BLACKSKY-MD LOTTO*

Wie viel möchtest du setzen?

📌 *Beispiel:* 
${usedPrefix + command} 100
    `.trim();

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

        let lastLottery = user.lastLottery || 0;
        let balance = user.money; // Bankkonto des Benutzers

        let remainingCooldown = now - lastLottery < cooldown;
        if (remainingCooldown) {
            throw `⏳ Bitte warte *${msToTime(lastLottery + cooldown - now)}*, bevor du erneut spielst.`;
        }

        if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
        if (balance < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

        global.db.data.users[m.sender].lastLottery = now;

        // Lottery Chance (1 in 100)
        let lotteryChance = Math.random() * 100;
        let jackpot = Math.floor(Math.random() * 1000) + 100; // Jackpot zwischen 100 und 1000

        let resultMessage;
        if (lotteryChance <= 1) {
            // User gewinnt den Jackpot
            user.money += jackpot;
            resultMessage = `🎉 *Glückwunsch!* Du hast *${jackpot}* MONEY im Lotto gewonnen! 🏆\nNeuer Kontostand: ➡️ *${user.money}* MONEY`;
        } else {
            // User verliert, kein Geld zurück
            user.money -= bet;
            resultMessage = `❌ *Leider verloren!* Du hast *${bet}* MONEY gesetzt, aber leider nichts gewonnen. 😞\nNeuer Kontostand: ➡️ *${user.money}* MONEY`;
        }

        await conn.sendMessage(m.chat, {
            text: resultMessage
        });

    } catch (e) {
        console.error('Fehler im Lotto-Plugin:', e);
        m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
    }
}

handler.help = ['lottery <betrag>'];
handler.tags = ['economy'];
handler.command = ['lottery', 'lotto'];
handler.group = true;
handler.rpg = true;

module.exports = handler;

// Hilfsfunktionen
function msToTime(ms) {
    let sec = Math.floor(ms / 1000);
    return `${sec} Sekunde${sec !== 1 ? 'n' : ''}`;
}

const { getBalance, subtractBalance, addBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);

  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  }

  let currentBalance = await getBalance(m.sender); // ✅ await hinzugefügt
  if (currentBalance < amount) {
    return m.reply('❗ Du hast nicht genug Münzen, um teilzunehmen!');
  }

  await subtractBalance(m.sender, amount); // ✅ await hinzugefügt

  let lotteryChance = Math.random() * 100;
  let jackpot = Math.floor(Math.random() * 1000) + 100;

  if (lotteryChance <= 1) {
    await addBalance(m.sender, jackpot); // ✅ await hinzugefügt
    let newBalance = await getBalance(m.sender); // ✅ neuer Kontostand
    await conn.sendMessage(m.chat, {
      text: `🎉 *Glückwunsch!* Du hast *${jackpot} Münzen* im Lotto gewonnen! 🏆\nDein neuer Kontostand: ${newBalance} Münzen.`,
    }, { quoted: m });
  } else {
    let newBalance = await getBalance(m.sender); // ✅ neuer Kontostand
    await conn.sendMessage(m.chat, {
      text: `❌ *Leider verloren!* Du hast *${amount} Münzen* gesetzt, aber nichts gewonnen. 😞\nDein Kontostand: ${newBalance} Münzen.`,
    }, { quoted: m });
  }
};

handler.command = ['lottery', 'lotto'];
handler.help = ['lottery [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
