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
