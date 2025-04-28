const { getBalance, subtractBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');

  let current = getBalance(m.sender);
  if (current < amount) return m.reply('❗ Du hast nicht genug Münzen!');

  subtractBalance(m.sender, amount);
  await conn.sendMessage(m.chat, {
    text: `✅ *Einzahlung Erfolgreich!*\n\n💸 Betrag: *${amount} Münzen*\n🪪 Konto aktualisiert!`,
  }, { quoted: m });
};

handler.command = ['deposit', 'einzahlen'];
handler.help = ['deposit [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
