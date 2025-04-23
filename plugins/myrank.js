const fs = require('fs');
const file = './lib/ranks.json';

let ranks = {};
if (fs.existsSync(file)) {
  try {
    ranks = JSON.parse(fs.readFileSync(file));
  } catch {
    ranks = {};
  }
}

let handler = async (m, { conn }) => {
  const rank = ranks[m.sender] || 'Kein Rang';
  await m.reply(`🧾 Dein aktueller Rang: *${rank}*`);
};

handler.command = ['myrank'];
handler.help = ['myrank'];
handler.tags = ['user'];

module.exports = handler;
