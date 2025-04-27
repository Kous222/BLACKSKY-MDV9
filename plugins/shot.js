let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte markiere die Person, auf die du schießen möchtest!');
  }

  // List of funny random reactions
  let reactions = [
    '💥 Volltreffer! Direkt ins Herz!',
    '😱 Kritischer Treffer! Das wird wehtun!',
    '🎯 Präzise wie ein Scharfschütze!',
    '😂 Verfehlt! Versuch es nochmal!',
    '😎 Mit Stil getroffen!',
    '🤕 Autsch! Das hat gesessen!',
    '🤡 Der Schuss ging nach hinten los!',
    '🛡️ Geblockt! Keine Wirkung!'
  ];

  // Pick a random reaction
  let randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

  // Create the main shot message
  let message = `🔫 *@${m.sender.split('@')[0]}* schießt auf *@${mentioned.split('@')[0]}*! ${randomReaction}`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['shot [@user]'];
handler.tags = ['fun'];
handler.command = /^shot$/i;

module.exports = handler;