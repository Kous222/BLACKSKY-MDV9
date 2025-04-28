const { getBalance, addBalance, getLastDaily, setLastDaily } = require('../lib/bank');

let handler = async (m, { conn }) => {
  const now = Date.now();
  const last = getLastDaily(m.sender);
  const cooldown = 24 * 60 * 60 * 1000; // 24 Stunden

  if (now - last < cooldown) {
    let remaining = cooldown - (now - last);
    let hours = Math.floor(remaining / (1000 * 60 * 60));
    let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return m.reply(`⏳ Du hast deine tägliche Belohnung schon abgeholt!\nBitte warte noch *${hours} Stunden ${minutes} Minuten*.`);
  }

  let reward = Math.floor(Math.random() * 400) + 100; // 100–500 Münzen
  addBalance(m.sender, reward);
  setLastDaily(m.sender, now);

  await conn.sendMessage(m.chat, {
    text: `🎁 *Tägliche Belohnung!*\n\n🏦 Du hast *${reward} Münzen* erhalten.\nMelde dich morgen wieder an für mehr!`,
  }, { quoted: m });
};

handler.command = ['daily', 'täglich'];
handler.help = ['daily'];
handler.tags = ['economy'];

module.exports = handler;
