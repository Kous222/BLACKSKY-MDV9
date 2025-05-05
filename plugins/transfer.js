const mongoose = require('mongoose');
const { Schema } = mongoose;

// Assuming you have a `User` schema for storing balance
const userSchema = new Schema({
  jid: { type: String, unique: true },
  balance: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

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

  try {
    // Überprüfen, ob der Absender genug Balance hat
    let sender = await User.findOne({ jid: m.sender });
    if (!sender || sender.balance < amount) {
      return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto.');
    }

    // Sicherstellen, dass man nicht an sich selbst sendet
    if (target === m.sender) {
      return m.reply('❗ Du kannst dir selbst keine Münzen senden.');
    }

    // Überprüfen und aktualisieren der Balance des Zielbenutzers
    let receiver = await User.findOne({ jid: target });
    if (!receiver) {
      // Wenn der Empfänger noch keinen Eintrag hat, erstelle einen neuen
      receiver = new User({ jid: target, balance: 0 });
      await receiver.save();
    }

    // Balance aktualisieren
    sender.balance -= amount;
    receiver.balance += amount;

    // Speichern der aktualisierten Balance
    await sender.save();
    await receiver.save();

    // Bestätigung des Transfers
    await conn.sendMessage(m.chat, {
      text: `🤝 *Transfer Erfolgreich!*\n\n👤 Von: @${m.sender.split('@')[0]}\n👥 An: @${target.split('@')[0]}\n💸 Betrag: *${amount} Münzen*`,
      mentions: [m.sender, target],
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('❗ Es gab einen Fehler beim Übertragen der Münzen. Bitte versuche es später noch einmal.');
  }
};

handler.command = ['transfer', 'sende'];
handler.help = ['transfer @user [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
