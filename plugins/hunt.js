const { getBalance, addBalance, subtractBalance } = require('../lib/bank');

let handler = async (m) => {
  let currentBalance = getBalance(m.sender);
  let cost = 50; // Cost to play the treasure hunt

  // Check if the user has enough balance to play
  if (currentBalance < cost) return m.reply('❗ Du hast nicht genug Münzen, um nach einem Schatz zu suchen!');

  // Subtract the cost for playing the treasure hunt
  subtractBalance(m.sender, cost);

  // Randomly determine if the user finds a treasure
  let result = Math.random() > 0.7; // 30% chance to find treasure
  let reward = Math.floor(Math.random() * 200) + 50; // Reward between 50 and 250 coins

  if (result) {
    // User finds treasure and wins coins
    addBalance(m.sender, reward);
    await m.reply(`🏆 *Schatz gefunden!* Du hast *${reward} Münzen* gefunden! 🤑\nDein Kontostand: ${getBalance(m.sender)} Münzen.`);
  } else {
    // User doesn't find treasure
    await m.reply(`💥 *Leider kein Schatz gefunden!* Du hast *${cost} Münzen* für die Schatzsuche ausgegeben.\nDein Kontostand: ${getBalance(m.sender)} Münzen.`);
  }
};

handler.command = ['hunt', 'schatzsuche'];
handler.help = ['hunt'];
handler.tags = ['economy'];

module.exports = handler;
