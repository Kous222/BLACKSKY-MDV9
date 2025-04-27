let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, für die du diesen lustigen Beitrag machen möchtest!');
  }

  // Generate the message in a random funny format
  let randomMessages = [
    `🌸 *@${mentioned.split('@')[0]}* hat ihre Periode und ist unaufhaltbar! 💣🥴`,
    `😵 *@${mentioned.split('@')[0]}* hat gerade eine stressige Woche und ist offiziell im "Nicht ansprechbar"-Modus! 💥`,
    `💕 *@${mentioned.split('@')[0]}* ist völlig verliebt und schwebt auf Wolke 7! ☁️😻`,
    `💪 *@${mentioned.split('@')[0]}* ist im Superpower-Modus! Sie kann jetzt alles, was sie will! ✨🔥`,
    `🍕 *@${mentioned.split('@')[0]}* hat gerade eine sehr ernste Beziehung zu Essen! 🍟🍫💖`,
    `😴 *@${mentioned.split('@')[0]}* ist so müde, dass selbst ein Kaffee sie nicht mehr retten kann! ☕🚨`,
    `🎭 *@${mentioned.split('@')[0]}* ist gerade die Königin des Dramas! 👑💅`,
    `🍿 *@${mentioned.split('@')[0]}* ist im Netflix-Modus und hat 10 Folgen in 1 Stunde geschaut! 📺📲`
  ];

  let message = randomMessages[Math.floor(Math.random() * randomMessages.length)];

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned] // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['period [@user]'];
handler.tags = ['fun'];
handler.command = /^period$/i;

module.exports = handler;