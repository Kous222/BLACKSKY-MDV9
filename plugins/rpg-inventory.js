const { initUser } = require('../lib/bank');

let handler = async (m, { command }) => {
  try {
    const user = await initUser(m.sender);

    const inv = user.inventory;
    const entries = Object.entries(inv).filter(([_, count]) => count > 0);

    if (entries.length === 0) {
      return m.reply('📦 Dein Inventar ist leer.');
    }

    let text = '🎒 *Dein Inventar:*\n\n';
    for (let [item, count] of entries) {
      text += `• ${item}: ${count}x\n`;
    }

    m.reply(text.trim());
  } catch (e) {
    console.error('Fehler beim Laden des Inventars:', e);
    m.reply('⚠️ Fehler beim Abrufen deines Inventars.');
  }
};

handler.command = ['inventory', 'inv'];
handler.help = ['inventory'];
handler.tags = ['economy'];

module.exports = handler;
