const { getBalance } = require('../lib/bank');

let handler = async (m, { conn }) => {
  let balance = getBalance(m.sender);
  await conn.sendMessage(m.chat, {
    text: `🏦 *Kontostand*\n\n💳 Du hast aktuell *${balance} Münzen* auf deinem Konto.\n\n💡 Bleib aktiv, um noch reicher zu werden!`,
  }, { quoted: m });
};

handler.command = ['balance', 'bal', 'kontostand'];
handler.help = ['balance'];
handler.tags = ['economy'];

module.exports = handler;
