const { getBalance, addBalance, subtractBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  if (!m.mentionedJid[0]) return m.reply('❗ Markiere jemanden, dem du Münzen senden willst.');
  
  let target = m.mentionedJid[0];
  let amount = parseInt(args[1]);
  
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  
  let current = getBalance(m.sender);
  if (current < amount) return m.reply('❗ Du hast nicht genug Münzen!');

  subtractBalance(m.sender, amount);
  addBalance(target, amount);
  
  await conn.sendMessage(m.chat, {
    text: `🤝 *Transfer Erfolgreich!*\n\n👤 Von: @${m.sender.split('@')[0]}\n👥 An: @${target.split('@')[0]}\n💸 Betrag: *${amount} Münzen*`,
    mentions: [m.sender, target],
  }, { quoted: m });
};

handler.command = ['transfer', 'sende'];
handler.help = ['transfer @user [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
