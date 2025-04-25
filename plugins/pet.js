let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du verwöhnen möchtest!');
  }

  // List of pet messages
  let petMessages = [
    `🐾 *@${mentioned.split('@')[0]}*, du bist jetzt mein Lieblingshaustier!* 🐾\n\n` +
    'Komm her, ich will dir eine Kraulmassage geben! 😻💖',

    `🐱 *@${mentioned.split('@')[0]}*, du bist mein kleines Haustier!* 🐱\n\n` +
    'Lass uns zusammen spielen und kuscheln. 😻💞',

    `🐶 *@${mentioned.split('@')[0]}*, du bist mein flauschiges Haustier!* 🐶\n\n` +
    'Ich werde dich so richtig verwöhnen, keine Sorge. 😘💖',

    `💖 *@${mentioned.split('@')[0]}*, du bist mein süßes Haustier!* 💖\n\n` +
    'Ich werde dir ganz viele Küsse und Streicheleinheiten geben! 😘🐾',

    `🌟 *@${mentioned.split('@')[0]}*, du bist mein kleines Hündchen!* 🌟\n\n` +
    'Komm her, ich habe ein Leckerli für dich! 😻🐾'
  ];

  // Randomly select one of the pet messages
  let petMessage = petMessages[Math.floor(Math.random() * petMessages.length)];

  // Send the pet message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: petMessage,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['pet [@user]'];
handler.tags = ['fun', 'love'];
handler.command = /^pet$/i;

module.exports = handler;
