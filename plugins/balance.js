const { getBalance } = require('../lib/bank'); // Import the MongoDB method

let handler = async (m, { conn }) => {
  let sender = m.sender;

  // Fetch balance from MongoDB
  let balance = await getBalance(sender);

  await conn.sendMessage(m.chat, {
    text: `🏦 *Kontostand*\n\n💳 Du hast aktuell *${balance} Münzen* auf deinem Konto.\n\n💡 Bleib aktiv, um noch reicher zu werden!`,
  }, { quoted: m });
};

handler.command = ['balance', 'bal', 'kontostand'];
handler.help = ['balance'];
handler.tags = ['economy'];

module.exports = handler;
