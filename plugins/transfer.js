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

  if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
  if (!global.db.data.users[sender]) global.db.data.users[sender] = { money: 0 };
  if (!global.db.data.users[target]) global.db.data.users[target] = { money: 0 };

  let senderUser = global.db.data.users[sender];
  let targetUser = global.db.data.users[target];

  if (senderUser.money < amount) {
    return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto.');
  }

  if (sender === target) {
    return m.reply('❗ Du kannst dir selbst keine Münzen senden.');
  }

  senderUser.money -= amount;
  targetUser.money += amount;

  await conn.sendMessage(m.chat, {
    text: `🤝 *Transfer Erfolgreich!*\n\n👤 Von: @${sender.split('@')[0]}\n👥 An: @${target.split('@')[0]}\n💸 Betrag: *${amount} Münzen*`,
    mentions: [sender, target],
  }, { quoted: m });
};

handler.command = ['transfer', 'sende'];
handler.help = ['transfer @user [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
