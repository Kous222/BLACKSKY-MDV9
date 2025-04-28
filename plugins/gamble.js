const { getBalance, subtractBalance, addBalance } = require('../lib/bank');

let handler = async (m, { conn, args, usedPrefix }) => {
  // Get the amount the user wants to gamble
  let amount = parseInt(args[0]);

  // Check if the amount is valid
  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an, den du setzen möchtest.');
  }

  // Check if the user has enough balance
  let currentBalance = getBalance(m.sender);
  if (currentBalance < amount) {
    return m.reply('❗ Du hast nicht genug Münzen für diese Wette!');
  }

  // Simulate a 50/50 chance
  let result = Math.random() > 0.5; // Win if > 0.5, lose if <= 0.5

  if (result) {
    // User wins, add the amount to their balance
    addBalance(m.sender, amount);
    await conn.sendMessage(m.chat, {
      text: `🎰 *Wette gewonnen!* \n\nDu hast *${amount} Münzen* gewonnen! 🤑\nDein neues Kontostand: ${getBalance(m.sender)} Münzen.`,
    }, { quoted: m });
  } else {
    // User loses, subtract the amount from their balance
    subtractBalance(m.sender, amount);
    await conn.sendMessage(m.chat, {
      text: `🎰 *Wette verloren!* \n\nDu hast *${amount} Münzen* verloren. 😔\nDein neues Kontostand: ${getBalance(m.sender)} Münzen.`,
    }, { quoted: m });
  }
};

handler.command = ['gamble', 'wette'];
handler.help = ['gamble [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
