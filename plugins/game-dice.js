const mongoose = require('mongoose');
const { getBalance, addBalance, subtractBalance } = require('../lib/bank');
const ms = require('ms');

const userSchema = new mongoose.Schema({
  sender: String,
  lastDice: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const infoText = `
🎲 *BLACKSKY-MD DICE ROLL*

Wie viel möchtest du setzen?

📌 *Beispiel:* 
${usedPrefix + command} 200
  `.trim();

  if (!args[0]) throw infoText;
  if (isNaN(args[0])) throw '❌ Bitte gib eine gültige Zahl als Einsatz an.';

  let bet = parseInt(args[0]);
  const cooldown = 15000; // 15 Sekunden
  const now = Date.now();

  let user = await User.findOne({ sender: m.sender });
  if (!user) {
    user = new User({ sender: m.sender });
    await user.save();
  }

  if (now - user.lastDice < cooldown) {
    throw `⏳ Bitte warte *${ms(user.lastDice + cooldown - now)}*, bevor du erneut spielst.`;
  }

  let balance = await getBalance(m.sender);

  if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
  if (balance < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

  user.lastDice = now;
  await user.save();

  // Würfelwurf 1-6
  let diceRoll = Math.floor(Math.random() * 6) + 1;

  let resultMessage;
  if (diceRoll >= 5) { // Gewinn bei 5 oder 6
    let winAmount = bet * 2;
    await addBalance(m.sender, winAmount);
    resultMessage = `🎉 Du hast eine *${diceRoll}* gewürfelt!\nDu gewinnst *${winAmount}* MONEY!\nNeuer Kontostand: *${await getBalance(m.sender)}* MONEY`;
  } else {
    await subtractBalance(m.sender, bet);
    resultMessage = `😞 Du hast eine *${diceRoll}* gewürfelt.\nDu verlierst *${bet}* MONEY.\nNeuer Kontostand: *${await getBalance(m.sender)}* MONEY`;
  }

  await conn.sendMessage(m.chat, { text: resultMessage }, { quoted: m });
};

handler.help = ['dice <betrag>'];
handler.tags = ['spiel'];
handler.command = ['dice', 'würfeln'];
handler.group = true;
handler.rpg = true;

module.exports = handler;
