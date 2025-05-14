const { getUserRank } = require('../lib/rank');

let handler = async (m) => {
  try {
    const rank = await getUserRank(m.sender);
    await m.reply(`🧾 Dein aktueller Rang: *${rank}*`);
  } catch (err) {
    console.error('Fehler beim Abrufen des Rangs:', err);
    await m.reply('❌ Es gab ein Problem beim Abrufen deines Rangs.');
  }
};

handler.command = ['myrank'];
handler.help = ['myrank'];
handler.tags = ['user'];

module.exports = handler;
