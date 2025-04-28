const { getBalance, subtractBalance, addBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');

  let currentBalance = getBalance(m.sender);
  if (currentBalance < amount) return m.reply('❗ Du hast nicht genug Münzen, um zu spielen.');

  // Subtract the bet amount
  subtractBalance(m.sender, amount);

  // Spin the wheel
  let prizes = [
    { name: '🍒 50 Münzen', reward: 50 },
    { name: '🍋 100 Münzen', reward: 100 },
    { name: '🍉 200 Münzen', reward: 200 },
    { name: '🍇 0 Münzen', reward: 0 },
    { name: '🍓 500 Münzen', reward: 500 },
    { name: '🍊 0 Münzen', reward: 0 },
  ];

  let spinResult = prizes[Math.floor(Math.random() * prizes.length)];
  let message = `🎰 *Dreh das Rad!* Du hast *${spinResult.name}* gewonnen!`;

  if (spinResult.reward > 0) {
    addBalance(m.sender, spinResult.reward);
    message += `\n🤑 Du hast *${spinResult.reward} Münzen* gewonnen!`;
  } else {
    message += `\n😔 Leider hast du keine Münzen gewonnen.`;
  }

  await conn.sendMessage(m.chat, {
    text: message,
  }, { quoted: m });
};

handler.command = ['spin', 'rad', 'wheel'];
handler.help = ['spin [betrag]'];
handler.tags = ['economy', 'game'];

module.exports = handler;
