const { getBalance, addBalance } = require('../lib/bank'); // use addBalance instead of subtractBalance

let handler = async (m, { conn, args }) => {
  // Parse amount from args
  let amount = parseInt(args[0]);
  
  // Validate the amount input
  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  }

  // Get current balance
  let current = getBalance(m.sender);
  
  // Add the deposit amount to the current balance
  addBalance(m.sender, amount);

  // Send confirmation message
  await conn.sendMessage(m.chat, {
    text: `✅ *Einzahlung Erfolgreich!*\n\n💸 Betrag: *${amount} Münzen*\n🪪 Konto aktualisiert!`,
  }, { quoted: m });
};

handler.command = ['deposit', 'einzahlen'];
handler.help = ['deposit [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
