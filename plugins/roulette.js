const mongoose = require('mongoose');
const { getBalance, addBalance, subtractBalance } = require('../lib/bank'); // If you have custom functions, keep them, else use MongoDB logic directly

// MongoDB Schema for Users (if not defined elsewhere)
const userSchema = new mongoose.Schema({
    sender: String,
    balance: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);
  let guess = parseInt(args[1]);

  // Validate the amount and guess
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  if (!guess || isNaN(guess) || guess < 1 || guess > 10) return m.reply('❗ Bitte gib eine Zahl zwischen 1 und 10 zum Setzen an.');

  // Fetch user from MongoDB (create if not exists)
  let user = await User.findOne({ sender: m.sender });
  if (!user) {
    user = new User({ sender: m.sender });
    await user.save();
  }

  let currentBalance = user.balance;
  
  if (currentBalance < amount) return m.reply('❗ Du hast nicht genug Münzen, um zu wetten!');

  // Subtract the betting amount
  user.balance -= amount;
  await user.save();

  // Spin the roulette (random number between 1 and 10)
  let result = Math.floor(Math.random() * 10) + 1;

  if (guess === result) {
    // User wins, double the bet
    let winnings = amount * 2;
    user.balance += winnings;
    await user.save();
    await conn.sendMessage(m.chat, {
      text: `🎉 *Roulette Gewinn!* Du hast richtig geraten und *${winnings} Münzen* gewonnen! 🏆\nDein Kontostand: ${user.balance} Münzen.`,
    }, { quoted: m });
  } else {
    // User loses the bet
    await conn.sendMessage(m.chat, {
      text: `🎰 *Roulette verloren!* Du hast *${amount} Münzen* verloren.\nDie richtige Zahl war *${result}*.\nDein Kontostand: ${user.balance} Münzen.`,
    }, { quoted: m });
  }
};

handler.command = ['roulette', 'roulettebet'];
handler.help = ['roulette [betrag] [nummer]'];
handler.tags = ['economy'];

module.exports = handler;
