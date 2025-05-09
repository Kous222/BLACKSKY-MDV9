const { getBalance, addBalance } = require('../lib/bank'); // Import MongoDB functions

let handler = async (m, { conn, args }) => {
  let sender = m.sender;
  let amount = parseInt(args[0]);

  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an.\nBeispiel: .deposit 100');
  }

  // Fetch current balance from MongoDB
  let balance = await getBalance(sender);

  // Add the deposit amount to the balance
  await addBalance(sender, amount);

  // Send success message
  await conn.sendMessage(m.chat, {
    text: `✅ *Einzahlung Erfolgreich!*\n\n💸 Betrag: *${amount} Münzen*\n📈 Neuer Kontostand: *${balance + amount} Münzen*`,
  }, { quoted: m });
};

handler.command = ['deposit', 'einzahlen'];
handler.help = ['deposit [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
