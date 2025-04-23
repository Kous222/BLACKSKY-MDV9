const fs = require('fs');
const path = './lib/ideas.json';

// Check if the ideas file exists; if not, initialize it with an empty array
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([]));
}

// Function to handle the ideas list
const command = async (m) => {
  // Read the ideas from the JSON file
  const ideas = JSON.parse(fs.readFileSync(path));

  // Filter open ideas
  const offen = ideas.filter(i => i.status === 'offen');

  // If there are no open ideas, return a message
  if (!offen.length) return m.reply('✅ Es gibt keine offenen Ideen.');

  // Map the open ideas into a string format to display
  const list = offen.map(i => 
    `🆔 *${i.id}*\n🧠 ${i.text}\n👤 @${i.userId.split('@')[0]}\n🕒 ${i.timestamp}`
  ).join('\n\n');

  // Send a message with the list of open ideas
  m.reply(`📋 *Offene Ideen:*\n\n${list}`, null, {
    mentions: offen.map(i => i.userId)
  });
};

// Plugin export to match the structure you're using
const handler = async (m, { conn }) => {
  await command(m);
};

handler.command = ['ideenliste'];
handler.help = ['ideenliste'];
handler.tags = ['community'];
handler.group = true;
handler.admin = true;
handler.owner = true;

module.exports = handler;
