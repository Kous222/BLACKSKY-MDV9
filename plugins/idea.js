const { getUserRank } = require('../lib/rank');  // Import rank management system
const { addIdea, getAllIdeas, acceptIdea, declineIdea, clearIdeas } = require('../lib/ideas'); // Import idea management system

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Get the sender's rank
  const senderRank = await getUserRank(m.sender);

  // Define allowed ranks for administrative actions
  const allowedRanks = ['owner', 'teamleiter', 'manager'];
  const isAuthorized = allowedRanks.includes(senderRank) || global.owner?.includes(m.sender.split('@')[0]);

  const action = (args[0] || '').toLowerCase();
  const index = parseInt(args[1]) - 1;

  // Handle ideas submission for normal users
  if (!isAuthorized || !['accept', 'decline', 'clear'].includes(action)) {
    const text = args.join(' ').trim();
    if (!text) return m.reply(`💡 Bitte gib eine Idee an!\nBeispiel: *${usedPrefix}idea Ein Shop-System*`);

    // Add idea to the database
    await addIdea(m.sender, text);

    return m.reply('✅ Deine Idee wurde gespeichert! Danke für deinen Vorschlag!');
  }

  // Admin actions: accept, decline, clear
  if (action === 'clear') {
    await clearIdeas(); // Clear all ideas
    return m.reply('🗑️ Alle Ideen wurden gelöscht.');
  }

  const ideas = await getAllIdeas(); // Get all ideas from the database

  if (!ideas.length) return m.reply('📭 Es sind derzeit keine Ideen vorhanden.');

  if (action === 'accept' || action === 'decline') {
    if (isNaN(index) || index < 0 || index >= ideas.length)
      return m.reply(`❗ Ungültiger Index. Beispiel: *${usedPrefix}${command} accept 1*`);

    const { sender, idea, _id } = ideas[index];

    // Accept or decline the idea
    if (action === 'accept') {
      await acceptIdea(_id); // Remove the accepted idea
    } else {
      await declineIdea(_id); // Remove the declined idea
    }

    return conn.sendMessage(m.chat, {
      text: action === 'accept'
        ? `✅ Idee von @${sender.split('@')[0]} *angenommen*:\n\n🧠 ${idea}`
        : `❌ Idee von @${sender.split('@')[0]} *abgelehnt*:\n\n🧠 ${idea}`,
      mentions: [sender]
    });
  }

  // List all ideas
  let list = ideas.map((i, idx) =>
    `*${idx + 1}.* @${i.sender.split('@')[0]}\n💡 ${i.idea}`
  ).join('\n\n');

  return conn.sendMessage(m.chat, {
    text: `📋 *Offene Bot-Ideen:*\n\n${list}`,
    mentions: ideas.map(i => i.sender)
  });
};

handler.help = ['idea <Text>', 'ideas', 'ideas accept <Nummer>', 'ideas decline <Nummer>', 'ideas clear'];
handler.tags = ['owner'];
handler.command = ['idea', 'ideas'];

module.exports = handler;
