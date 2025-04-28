const { getBalance, addBalance, subtractBalance } = require('../lib/bank');

let handler = async (m, { args }) => {
  let amount = parseInt(args[0]);
  let guess = parseInt(args[1]);

  // Validate the amount and guess
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  if (!guess || isNaN(guess) || guess < 1 || guess > 10) return m.reply('❗ Bitte gib eine Zahl zwischen 1 und 10 zum Setzen an.');

  let currentBalance = getBalance(m.sender);
  if (currentBalance < amount) return m.reply('❗ Du hast nicht genug Münzen, um zu wetten!');

  // Subtract the betting amount
  subtractBalance(m.sender, amount);

  // Spin the roulette (random number between 1 and 10)
  let result = Math.floor(Math.random() * 10) + 1;

  if (guess === result) {
    // User wins, double the bet
    let winnings = amount * 2;
    addBalance(m.sender, winnings);
    await conn.sendMessage(m.chat, {
      text: `🎉 *Roulette Gewinn!* Du hast richtig geraten und *${winnings} Münzen* gewonnen! 🏆\nDein Kontostand: ${getBalance(m.sender)} Münzen.`,
    }, { quoted: m });
  } else {
    // User loses the bet
    await conn.sendMessage(m.chat, {
      text: `🎰 *Roulette verloren!* Du hast *${amount} Münzen* verloren.\nDie richtige Zahl war *${result}*.\nDein Kontostand: ${getBalance(m.sender)} Münzen.`,
    }, { quoted: m });
  }
};

handler.command = ['roulette', 'roulettebet'];
handler.help = ['roulette [betrag] [nummer]'];
handler.tags = ['economy'];

module.exports = handler;
