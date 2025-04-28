const { getBalance, addBalance, subtractBalance } = require('../lib/bank');

let handler = async (m, { conn, args }) => {
  // Überprüfen, ob ein Benutzer markiert wurde
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return m.reply('❗ Bitte markiere jemanden, dem du Münzen senden möchtest.\nBeispiel: .transfer @user 100');
  }

  let target = m.mentionedJid[0];

  // Überprüfen, ob ein Betrag angegeben wurde
  if (!args[1]) {
    return m.reply('❗ Bitte gib den Betrag an, den du senden möchtest.\nBeispiel: .transfer @user 100');
  }

  let amount = parseInt(args[1]);

  // Sicherstellen, dass der Betrag eine gültige Zahl ist
  if (isNaN(amount) || amount <= 0) {
    return m.reply('❗ Ungültiger Betrag. Gib eine positive Zahl an.\nBeispiel: .transfer @user 100');
  }

  // Überprüfen, ob der Absender genug Balance hat
  let senderBalance = getBalance(m.sender);
  if (senderBalance < amount) {
    return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto.');
  }

  // Sicherstellen, dass man nicht an sich selbst sendet
  if (target === m.sender) {
    return m.reply('❗ Du kannst dir selbst keine Münzen senden.');
  }

  // Balance aktualisieren
  subtractBalance(m.sender, amount);
  addBalance(target, amount);

  // Bestätigung des Transfers
  await conn.sendMessage(m.chat, {
    text: `🤝 *Transfer Erfolgreich!*\n\n👤 Von: @${m.sender.split('@')[0]}\n👥 An: @${target.split('@')[0]}\n💸 Betrag: *${amount} Münzen*`,
    mentions: [m.sender, target],
  }, { quoted: m });
};

handler.command = ['transfer', 'sende'];
handler.help = ['transfer @user [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
