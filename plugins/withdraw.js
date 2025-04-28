const { addBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');

  addBalance(m.sender, amount);
  await conn.sendMessage(m.chat, {
    text: `🏧 *Abhebung Erfolgreich!*\n\n💵 Betrag: *${amount} Münzen*\n✅ Viel Spaß beim Ausgeben!`,
  }, { quoted: m });
};

handler.command = ['withdraw', 'abheben'];
handler.help = ['withdraw [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
