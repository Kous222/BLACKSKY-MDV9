const fs = require('fs');
const path = './lib/ideas.json';

const command = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin && !isOwner) return m.reply('❌ Nur Admins können Ideen ablehnen.');
  const id = args[0];
  if (!id) return m.reply('❗ Bitte gib die Ideen-ID an. Beispiel: .declineidea ID-XYZ');

  const ideas = JSON.parse(fs.readFileSync(path));
  const idea = ideas.find(i => i.id === id);
  if (!idea) return m.reply('❌ Keine Idee mit dieser ID gefunden.');

  idea.status = 'abgelehnt';
  fs.writeFileSync(path, JSON.stringify(ideas, null, 2));

  await conn.sendMessage(idea.user, {
    text: `❌ Deine Idee (*${idea.text}*) wurde abgelehnt.`
  }).catch(() => {});

  m.reply(`❌ Idee *${id}* wurde abgelehnt.`);
};

module.exports = [
  {
    command: ['declineidea'],
    tags: ['community'],
    help: ['declineidea <id>'],
    group: true,
    admin: true,
    owner: true,
    run: command
  }
];
.*\n\nIdee: ${idea.idea}\n\nDanke trotzdem fürs Einreichen!`,
  });
};

handler.command = ['declineidea'];
handler.help = ['declineidea <ID>'];
handler.tags = ['community'];
handler.admin = true;

module.exports = handler;
