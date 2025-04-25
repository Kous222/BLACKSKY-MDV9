let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du ein Kompliment machen möchtest!');
  }

  // List of compliment messages
  let complimentMessages = [
    `🌟 *@${mentioned.split('@')[0]}*, du bist einfach unglaublich!* 🌟\n\n` +
    'Du siehst heute einfach fantastisch aus! 😍💖',

    `💖 *@${mentioned.split('@')[0]}*, du bist so eine wunderschöne Person!* 💖\n\n` +
    'Ich kann einfach nicht aufhören, dich zu bewundern. 😘✨',

    `🌹 *@${mentioned.split('@')[0]}*, du hast das schönste Lächeln!* 🌹\n\n` +
    'Es gibt nichts, was schöner ist als dein Lächeln. 💖😊',

    `💎 *@${mentioned.split('@')[0]}*, du bist ein wahrer Diamant!* 💎\n\n` +
    'Ich bewundere deine Schönheit und Ausstrahlung. 😍💖',

    `💖 *@${mentioned.split('@')[0]}*, du bist einfach so charmant!* 💖\n\n` +
    'Ich kann mich einfach nicht genug über deine Persönlichkeit freuen. 😘✨'
  ];

  // Randomly select one of the compliment messages
  let complimentMessage = complimentMessages[Math.floor(Math.random() * complimentMessages.length)];

  // Send the compliment message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: complimentMessage,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['compliment [@user]'];
handler.tags = ['fun', 'love'];
handler.command = /^compliment$/i;

module.exports = handler;
