const fs = require('fs');
const path = './lib/ideas.json';

const command = async (m, { conn, args }) => {
  if (m.sender !== global.owner[0]) return m.reply('❌ Nur der Bot-Owner darf Ideen annehmen.');
  const id = (args[0] || '').trim().toLowerCase();
  if (!id) return m.reply('❗ Beispiel: .acceptidea ID-XYZ');

  let ideas = [];
  try {
    ideas = JSON.parse(fs.readFileSync(path));
  } catch (e) {
    return m.reply('❌ Fehler beim Laden der Ideen.');
  }

  const idea = ideas.find(i => (i.id || '').toLowerCase() === id);
  if (!idea) return m.reply(`❌ Keine Idee mit der ID *${id}* gefunden.`);

  idea.status = 'angenommen';
  fs.writeFileSync(path, JSON.stringify(ideas, null, 2));

  await conn.sendMessage(idea.user, {
    text: `✅ *Deine Idee wurde angenommen!*\n\nDanke für deinen Beitrag: ${idea.text}`
  }).catch(() => {});

  m.reply(`✅ Idee *${idea.id}* wurde erfolgreich angenommen.`);
};

module.exports = [
  {
    command: ['acceptidea'],
    tags: ['community'],
    help: ['acceptidea <id>'],
    group: true,
    admin: false,
    owner: true,
    run: command
  }
];
.tags = ['community'];
handler.admin = true;

module.exports = handler;
