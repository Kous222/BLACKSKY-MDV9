const mongoose = require('mongoose');
const { getBalance, addBalance, subtractBalance } = require('../lib/bank');
const ms = require('ms');

const userSchema = new mongoose.Schema({
  sender: String,
  lastFlip: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const infoText = `
🪙 *BLACKSKY-MD COIN FLIP*

Wie viel möchtest du setzen? 

📌 *Beispiel:* 
${usedPrefix + command} 150
  `.trim();

  if (!args[0]) throw infoText;
  if (isNaN(args[0])) throw '❌ Bitte gib eine gültige Zahl als Einsatz an.';

  let bet = parseInt(args[0]);
  const cooldown = 10000; // 10 Sekunden
  const now = Date.now();

  let user = await User.findOne({ sender: m.sender });
  if (!user) {
    user = new User({ sender: m.sender });
    await user.save();
  }

  if (now - user.lastFlip < cooldown) {
    throw `⏳ Bitte warte *${ms(user.lastFlip + cooldown - now)}*, bevor du erneut spielst.`;
  }

  let balance = await getBalance(m.sender);

  if (bet < 100) throw '⚠️ Der Mindesteinsatz beträgt *100 MONEY*.';
  if (balance < bet) throw `❌ Du hast nicht genug *MONEY*.\nPrüfe deinen Kontostand mit *.balance*`;

  user.lastFlip = now;
  await user.save();

  let flip = Math.random() < 0.5 ? 'Kopf' : 'Zahl';

  // User gewinnt wenn Kopf (50% Chance)
  if (flip === 'Kopf') {
    let winAmount = bet * 2;
    await addBalance(m.sender, winAmount);
    await conn.sendMessage(m.chat, { text: `🪙 Es ist *${flip}*!\n🎉 Du gewinnst *${winAmount}* MONEY!\nNeuer Kontostand: *${await getBalance(m.sender)}* MONEY` }, { quoted: m });
  } else {
    await subtractBalance(m.sender, bet);
    await conn.sendMessage(m.chat, { text: `🪙 Es ist *${flip}*.\n😞 Du verlierst *${bet}* MONEY.\nNeuer Kontostand: *${await getBalance(m.sender)}* MONEY` }, { quoted: m });
  }
};

handler.help = ['coinflip <betrag>'];
handler.tags = ['spiel'];
handler.command = ['coinflip', 'münzwurf'];
handler.group = true;
handler.rpg = true;

module.exports = handler;
