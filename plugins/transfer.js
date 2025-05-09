const { getBalance, addBalance, subtractBalance } = require('../lib/bank'); // MongoDB functions

let handler = async (m, { conn, args }) => {
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return m.reply('❗ Bitte markiere jemanden, dem du Münzen senden möchtest.\nBeispiel: .transfer @user 100');
  }

  let sender = m.sender;
  let target = m.mentionedJid[0];

  if (!args[1]) {
    return m.reply('❗ Bitte gib den Betrag an, den du senden möchtest.\nBeispiel: .transfer @user 100');
  }

  let amount = parseInt(args[1]);
  if (isNaN(amount) || amount <= 0) {
    return m.reply('❗ Ungültiger Betrag. Gib eine positive Zahl an.\nBeispiel: .transfer @user 100');
  }

  // Fetch sender's and target's balances from MongoDB
  let senderBalance = await getBalance(sender);
  let targetBalance = await getBalance(target);

  if (senderBalance < amount) {
    return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto.');
  }

  if (sender === target) {
    return m.reply('❗ Du kannst dir selbst keine Münzen senden.');
  }

  // Update the balances in MongoDB
  await subtractBalance(sender, amount); // Subtract from sender
  await addBalance(target, amount); // Add to target

  // Send the transfer confirmation message
  await conn.sendMessage(m.chat, {
    text: `🤝 *Transfer Erfolgreich!*\n\n👤 Von: @${sender.split('@')[0]}\n👥 An: @${target.split('@')[0]}\n💸 Betrag: *${amount} Münzen*`,
    mentions: [sender, target],
  }, { quoted: m });
};

handler.command = ['transfer', 'sende'];
handler.help = ['transfer @user [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
