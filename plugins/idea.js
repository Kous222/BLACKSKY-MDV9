const { getUserRank } = require('../lib/rank');
const { addIdea, getAllIdeas, acceptIdea, declineIdea, clearIdeas } = require('../lib/ideas');

const ideaGroup = '120363399996195320@g.us'; // Gruppe für alle Ideen

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const senderRank = await getUserRank(m.sender);
  const allowedRanks = ['owner', 'teamleiter', 'manager'];
  const isAuthorized = allowedRanks.includes(senderRank) || global.owner?.includes(m.sender.split('@')[0]);

  const action = (args[0] || '').toLowerCase();
  const index = parseInt(args[1]) - 1;
  const ideas = await getAllIdeas();

  // ────────────────
  // USER: .idea <Text>
  // ────────────────
  if (command === 'idea') {
    const text = args.join(' ').trim();
    if (!text) return m.reply(`💡 Bitte gib eine Idee an!\nBeispiel: *${usedPrefix}idea Ein Shop-System*`);

    await addIdea(m.sender, text);
    await m.reply('✅ Deine Idee wurde gespeichert! Danke für deinen Vorschlag!');

    // Weiterleitung an die Admin-Gruppe
    await conn.sendMessage(ideaGroup, {
      text: `📩 Neue Idee eingereicht von @${m.sender.split('@')[0]}:\n\n💡 *${text}*`,
      mentions: [m.sender]
    });
    return;
  }

  // ────────────────
  // ALLE: .ideas (anzeigen)
  // ────────────────
  if (command === 'ideas' && !args.length) {
    if (!ideas.length) return m.reply('📭 Es sind derzeit keine Ideen vorhanden.');

    const list = ideas.map((i, idx) =>
      `*${idx + 1}.* @${i.sender.split('@')[0]}\n💡 ${i.idea}`
    ).join('\n\n');

    return conn.sendMessage(m.chat, {
      text: `📋 *Offene Bot-Ideen:*\n\n${list}`,
      mentions: ideas.map(i => i.sender)
    });
  }

  // ────────────────
  // ADMIN ONLY: .ideas accept/decline/clear
  // ────────────────
  if (!isAuthorized)
    return m.reply('❌ Du hast keine Berechtigung, diese Aktion durchzuführen.');

  if (['accept', 'decline'].includes(action)) {
    if (!ideas.length) return m.reply('📭 Es sind derzeit keine Ideen vorhanden.');

    if (isNaN(index) || index < 0 || index >= ideas.length)
      return m.reply(`❗ Ungültiger Index. Beispiel: *${usedPrefix}${command} accept 1*`);

    const { sender, idea, _id } = ideas[index];

    if (action === 'accept') await acceptIdea(_id);
    else await declineIdea(_id);

    return conn.sendMessage(m.chat, {
      text: action === 'accept'
        ? `✅ Idee von @${sender.split('@')[0]} *angenommen*:\n\n🧠 ${idea}`
        : `❌ Idee von @${sender.split('@')[0]} *abgelehnt*:\n\n🧠 ${idea}`,
      mentions: [sender]
    });
  }

  if (action === 'clear') {
    await clearIdeas();
    return m.reply('🗑️ Alle Ideen wurden gelöscht.');
  }

  throw `❗ Unbekannter Unterbefehl. Benutze:\n` +
        `- *${usedPrefix}idea <deine Idee>*\n` +
        `- *${usedPrefix}ideas*\n` +
        `- *${usedPrefix}ideas accept <Nummer>*\n` +
        `- *${usedPrefix}ideas decline <Nummer>*\n` +
        `- *${usedPrefix}ideas clear*`;
};

handler.help = ['idea <Text>', 'ideas', 'ideas accept <Nummer>', 'ideas decline <Nummer>', 'ideas clear'];
handler.tags = ['owner'];
handler.command = ['idea', 'ideas'];

module.exports = handler;
