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

const handler = async (m, { conn, text }) => {
  const senderId = m.sender; // Get the sender's ID
  const senderName = m.pushName || 'Unbekannt'; // Get the sender's name or default to 'Unknown'

  if (!text) {
    return m.reply('❗ Bitte gib deine Idee an. Beispiel: `.idee Eine neue Funktion für Auto-Memes im Chat`');
  }

  // Generate a unique ID for the idea
  const ideaId = 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const timestamp = new Date().toLocaleString('de-DE');

  // Prepare the idea object
  const newIdea = {
    id: ideaId,
    userId: senderId,
    userName: senderName,
    idea: text,
    timestamp: timestamp,
    status: 'offen', // Status of the idea, e.g., "open" for new ideas
  };

  // Add the new idea to the list of ideas
  ideas.push(newIdea);

  // Save the updated list of ideas
  saveIdeas();

  // Send confirmation message to the user
  await conn.sendMessage(senderId, {
    text: `✨ *Danke, ${senderName}!*  
Deine Idee (*${text}*) wurde erfolgreich eingereicht. Wir melden uns bald mit Feedback!`,
  });

  // Send the idea to the support group
  const supportGroupId = '120363399996195320@g.us'; // Set the group ID for ideas
  await conn.sendMessage(supportGroupId, {
    text: `💡 *Neue Community-Idee!*\n\n🧠 *Idee:* ${text}\n👤 *Von:* @${senderId.split('@')[0]} (${senderName})\n🆔 *Ideen-ID:* ${ideaId}\n🕒 *Eingereicht:* ${timestamp}\n\nWas haltet ihr davon?`,
    mentions: [senderId],
  });
};

handler.command = ['idee'];
handler.help = ['idee <text>'];
handler.tags = ['community'];

module.exports = handler;
