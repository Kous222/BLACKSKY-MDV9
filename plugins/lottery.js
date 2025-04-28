const { getBalance, subtractBalance, addBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);

  // Check if the amount is valid
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');

  let currentBalance = getBalance(m.sender);
  if (currentBalance < amount) return m.reply('❗ Du hast nicht genug Münzen, um teilzunehmen!');

  // Subtract the betting amount
  subtractBalance(m.sender, amount);

  // Lottery chance (1 in 100)
  let lotteryChance = Math.random() * 100;
  let jackpot = Math.floor(Math.random() * 1000) + 100; // Jackpot between 100 and 1000

  if (lotteryChance <= 1) {
    // User wins the jackpot
    addBalance(m.sender, jackpot);
    await conn.sendMessage(m.chat, {
      text: `🎉 *Glückwunsch!* Du hast *${jackpot} Münzen* im Lotto gewonnen! 🏆\nDein neuer Kontostand: ${getBalance(m.sender)} Münzen.`,
    }, { quoted: m });
  } else {
    // User loses, no money returned
    await conn.sendMessage(m.chat, {
      text: `❌ *Leider verloren!* Du hast *${amount} Münzen* für die Lotterie gesetzt, aber leider nichts gewonnen. 😞\nDein Kontostand: ${getBalance(m.sender)} Münzen.`,
    }, { quoted: m });
  }
};

handler.command = ['lottery', 'lotto'];
handler.help = ['lottery [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
