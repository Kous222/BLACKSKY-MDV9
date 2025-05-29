const { getBalance, addBalance, getLastDaily, setLastDaily } = require('../lib/bank');

let handler = async (m, { conn }) => {
  try {
    const now = Date.now();
    const id = m.sender.split('@')[0];

    const last = await getLastDaily(id);
    const cooldown = 24 * 60 * 60 * 1000; // 24 Stunden

    if (now - last < cooldown) {
      const remaining = cooldown - (now - last);
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      return m.reply(
        `⏳ *Tägliche Belohnung bereits abgeholt!*\n\nBitte warte noch *${hours}h ${minutes}min*, um erneut Münzen zu erhalten.`
      );
    }

    // Zufällige Belohnung (100–500 Münzen)
    const reward = Math.floor(Math.random() * 400) + 100;
    await addBalance(id, reward);
    await setLastDaily(id, now);

    const coins = new Intl.NumberFormat('de-DE').format(reward);

    await conn.sendMessage(m.chat, {
      text: `🎉 *Tägliche Belohnung*\n\n🏦 Du hast *${coins} Münzen* erhalten!\n\n📆 Komm morgen wieder, um weitere Belohnungen zu erhalten.`,
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
