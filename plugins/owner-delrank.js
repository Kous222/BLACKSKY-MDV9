const fs = require('fs');
const path = './lib/ranks.json';

// Ensure the ranks file exists
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({}));
}

// Function to handle rank deletion
const command = async (m, { conn, args, isOwner }) => {
  if (!isOwner) return m.reply('❌ Nur der Owner kann die Ränge löschen.');

  // Ensure the user provided a user ID
  const user = args[0]?.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  if (!user) return m.reply('❗ Bitte gib die Benutzer-ID an. Beispiel: .deleterank 49123456789');

  // Read the ranks data
  const ranks = JSON.parse(fs.readFileSync(path));

  // Check if the user has a rank
  if (!ranks[user]) return m.reply('❌ Dieser Benutzer hat keinen Rang.');

  // Delete the rank of the user
  delete ranks[user];

  // Save the updated ranks data
  fs.writeFileSync(path, JSON.stringify(ranks, null, 2));

  m.reply(`✅ Der Rang von @${user.split('@')[0]} wurde gelöscht.`, null, { mentions: [user] });
};

// Export the plugin
const handler = async (m, { conn, args, isOwner }) => {
  await command(m, { conn, args, isOwner });
};

handler.command = ['deleterank'];
handler.help = ['deleterank <user_id>'];
handler.tags = ['admin'];
handler.owner = true;

module.exports = handler;
