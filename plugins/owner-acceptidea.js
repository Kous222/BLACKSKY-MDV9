const fs = require('fs');
const path = './lib/ideas.json'; // Path to the ideas file
if (!fs.existsSync('./lib')) fs.mkdirSync('./lib'); // Ensure the directory exists

let ideas = []; // Initialize an empty array for ideas

// Load existing ideas if they exist
if (fs.existsSync(path)) {
  try {
    ideas = require(path); // Load ideas from the file
  } catch (e) {
    ideas = []; // If loading fails, reset to an empty array
  }
}

// Save function to write ideas to the JSON file
const saveIdeas = () => {
  try {
    fs.writeFileSync(path, JSON.stringify(ideas, null, 2)); // Save the ideas in the correct format
  } catch (error) {
    console.error("Error saving ideas:", error);
  }
};

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin && !isOwner) return m.reply('❌ Nur der Bot-Owner oder Admins können Ideen annehmen.');

  const id = (args[0] || '').trim().toLowerCase();
  if (!id) return m.reply('❗ Beispiel: .acceptidea ID-XYZ');

  // Find the idea based on the provided ID
  const idea = ideas.find(i => (i.id || '').toLowerCase() === id);
  if (!idea) return m.reply(`❌ Keine Idee mit der ID *${id}* gefunden.`);

  // Update the status of the idea to "angenommen"
  idea.status = 'angenommen';

  // Save the updated ideas array
  saveIdeas();

  // Send a confirmation message to the user
  await conn.sendMessage(idea.userId, {
    text: `✅ *Deine Idee wurde angenommen!*\n\nDanke für deinen Beitrag: ${idea.idea}`
  }).catch(() => {});

  // Reply in the group or to the admin
  m.reply(`✅ Idee *${idea.id}* wurde erfolgreich angenommen.`);
};

handler.command = ['acceptidea'];
handler.help = ['acceptidea <id>'];
handler.tags = ['community'];
handler.admin = true;
handler.owner = true;

module.exports = handler;
