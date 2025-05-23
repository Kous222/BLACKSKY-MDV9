const { getBalance, addBalance, getLastDaily, setLastDaily } = require('../lib/bank');

let handler = async (m, { conn }) => {
  try {
    const now = Date.now();
    const id = m.sender.split('@')[0];
    
    // Await the result of getLastDaily to ensure the value is fetched properly
    const last = await getLastDaily(id); // Ensure this is awaited
    const cooldown = 24 * 60 * 60 * 1000; // 24 Stunden

    if (now - last < cooldown) {
      let remaining = cooldown - (now - last);
      let hours = Math.floor(remaining / (1000 * 60 * 60));
      let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      return m.reply(`⏳ Du hast deine tägliche Belohnung schon abgeholt!\nBitte warte noch *${hours} Stunden ${minutes} Minuten*.`);
    }

    // Reward calculation
    let reward = Math.floor(Math.random() * 400) + 100; // 100–500 Münzen
    await addBalance(id, reward); // Await to ensure balance is updated
    await setLastDaily(id, now); // Await to ensure the timestamp is updated

    // Send reward message
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
