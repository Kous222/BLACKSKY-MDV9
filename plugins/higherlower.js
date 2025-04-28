const { getBalance, subtractBalance, addBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);
  let userGuess = args[1]?.toLowerCase();

  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  if (!['higher', 'lower'].includes(userGuess)) return m.reply('❗ Bitte wähle entweder *higher* oder *lower*.');

  let currentBalance = getBalance(m.sender);
  if (currentBalance < amount) return m.reply('❗ Du hast nicht genug Münzen für dieses Spiel.');

  // Subtract the bet amount
  subtractBalance(m.sender, amount);

  // Simulate card draw
  let currentCard = Math.floor(Math.random() * 13) + 1; // Card between 1 and 13
  let nextCard = Math.floor(Math.random() * 13) + 1;

  let resultMessage = `🃏 Die aktuelle Karte ist *${currentCard}*.\n🔮 Die nächste Karte ist *${nextCard}*.\n\n`;

  if (
    (userGuess === 'higher' && nextCard > currentCard) ||
    (userGuess === 'lower' && nextCard < currentCard)
  ) {
    addBalance(m.sender, amount * 2); // Win: double the bet
    resultMessage += `🎉 Du hast gewonnen! Du bekommst *${amount * 2} Münzen* zurück.`;
  } else {
    resultMessage += `😔 Du hast verloren. Du verlierst *${amount} Münzen*.`;
  }

  await conn.sendMessage(m.chat, { text: resultMessage }, { quoted: m });
};

handler.command = ['higherlower', 'higherorlower', 'höherniedriger'];
handler.help = ['higherlower [betrag] [higher/lower]'];
handler.tags = ['economy', 'game'];

module.exports = handler;
