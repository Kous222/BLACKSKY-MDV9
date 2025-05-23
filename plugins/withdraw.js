const { getBalance, subtractBalance } = require('../lib/bank'); // MongoDB methods

let handler = async (m, { conn, args }) => {
  let sender = m.sender;
  let amount = parseInt(args[0]);

  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');

  // Fetch balance from MongoDB
  let balance = await getBalance(sender);

  if (balance < amount) {
    return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto.');
  }

  // Subtract amount from MongoDB
  await subtractBalance(sender, amount);

  await conn.sendMessage(m.chat, {
    text: `🏧 *Abhebung Erfolgreich!*\n\n💵 Betrag: *${amount} Münzen*\n✅ Viel Spaß beim Ausgeben!`,
  }, { quoted: m });
};

handler.command = ['withdraw', 'abheben'];
handler.help = ['withdraw [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
