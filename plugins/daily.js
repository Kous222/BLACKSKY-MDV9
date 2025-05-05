const mongoose = require('mongoose');
const { Schema } = mongoose;

// Assuming you have a `User` schema for storing balance and last daily reward
const userSchema = new Schema({
  jid: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  lastDaily: { type: Date, default: 0 }, // Track last daily reward timestamp
});

const User = mongoose.model('User', userSchema);

let handler = async (m, { conn }) => {
  try {
    const now = Date.now();
    const id = m.sender.split('@')[0];

    // Find the user in the database
    let user = await User.findOne({ jid: id });

    // If the user doesn't exist in the database, create a new entry
    if (!user) {
      user = new User({ jid: id, balance: 0, lastDaily: 0 });
    }

    const last = user.lastDaily;
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours

    if (now - last < cooldown) {
      let remaining = cooldown - (now - last);
      let hours = Math.floor(remaining / (1000 * 60 * 60));
      let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      return m.reply(`⏳ Du hast deine tägliche Belohnung schon abgeholt!\nBitte warte noch *${hours} Stunden ${minutes} Minuten*.`);
    }

    let reward = Math.floor(Math.random() * 400) + 100; // 100–500 Münzen

    // Update user's balance
    user.balance += reward;

    // Update the last daily reward time
    user.lastDaily = now;

    // Save the updated user data to the database
    await user.save();

    await conn.sendMessage(m.chat, {
      text: `🎁 *Tägliche Belohnung!*\n\n🏦 Du hast *${reward} Münzen* erhalten.\nMelde dich morgen wieder an für mehr!`,
    }, { quoted: m });
  } catch (e) {
    console.error('Fehler im Daily-Plugin:', e);
    m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
  }
};

handler.command = ['daily', 'täglich'];
handler.help = ['daily'];
handler.tags = ['economy'];

module.exports = handler;
