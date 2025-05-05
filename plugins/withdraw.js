const mongoose = require('mongoose');
const { Schema } = mongoose;

// Assuming you have a `User` schema for storing balance
const userSchema = new Schema({
  jid: { type: String, unique: true },
  balance: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

let handler = async (m, { conn, args }) => {
  let amount = parseInt(args[0]);

  // Validate the amount input
  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an.');
  }

  try {
    // Get the current balance from the database
    let user = await User.findOne({ jid: m.sender });

    // If the user doesn't exist in the database, create a new entry
    if (!user) {
      user = new User({ jid: m.sender, balance: 0 });
    }

    // Check if the user has enough balance to withdraw
    if (user.balance < amount) {
      return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto, um diese Abhebung vorzunehmen.');
    }

    // Subtract the withdrawal amount from the balance
    user.balance -= amount;

    // Save the updated balance to the database
    await user.save();

    // Send confirmation message
    await conn.sendMessage(m.chat, {
      text: `🏧 *Abhebung Erfolgreich!*\n\n💵 Betrag: *${amount} Münzen*\n✅ Viel Spaß beim Ausgeben!`,
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('❗ Es gab einen Fehler bei der Abhebung. Bitte versuche es später noch einmal.');
  }
};

handler.command = ['withdraw', 'abheben'];
handler.help = ['withdraw [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
