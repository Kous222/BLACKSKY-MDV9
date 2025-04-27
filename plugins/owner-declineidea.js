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

let handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin && !isOwner) return m.reply('❌ Nur Admins oder der Owner können Ideen ablehnen.');

  const id = args[0];
  if (!id) return m.reply('❗ Bitte gib die Ideen-ID an. Beispiel: .declineidea ID-XYZ');

  const idea = ideas.find(i => i.id === id);
  if (!idea) return m.reply('❌ Keine Idee mit dieser ID gefunden.');

  // Update the idea status to 'abgelehnt'
  idea.status = 'abgelehnt';
  saveIdeas();

  // Notify the user who submitted the idea
  await conn.sendMessage(idea.userId, {
    text: `❌ Deine Idee (*${idea.idea}*) wurde abgelehnt.`
  }).catch(() => {});

  m.reply(`❌ Idee *${id}* wurde abgelehnt und der Nutzer @${idea.userName.split('@')[0]} wurde informiert.`, null, {
    mentions: [idea.userId]
  });
};

handler.command = ['declineidea'];
handler.help = ['declineidea <id>'];
handler.tags = ['admin', 'owner'];
handler.admin = true;
handler.owner = true;

module.exports = handler;
