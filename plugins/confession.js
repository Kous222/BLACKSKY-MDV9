let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du dein Geheimnis gestehen möchtest!');
  }

  // List of confession messages
  let confessionMessages = [
    `💬 *@${mentioned.split('@')[0]}*, ich muss dir etwas gestehen...* 💬\n\n` +
    'Ich habe mich schon so lange gefragt, ob du das auch fühlst. 😳💖',

    `❤️ *@${mentioned.split('@')[0]}*, es gibt da etwas, was ich dir schon lange sagen wollte!* ❤️\n\n` +
    'Es ist nicht einfach, aber ich muss es einfach loswerden... Ich habe Gefühle für dich. 😔💘',

    `💖 *@${mentioned.split('@')[0]}*, ich kann es einfach nicht mehr für mich behalten!* 💖\n\n` +
    'Ich habe mich in dich verliebt, auch wenn ich nicht weiß, wie du darüber denkst. 😳💞',

    `💌 *@${mentioned.split('@')[0]}*, das ist schwer zu sagen...* 💌\n\n` +
    'Aber ich muss es einfach loswerden – du bist der einzige Gedanke in meinem Kopf. 😔💓',

    `💘 *@${mentioned.split('@')[0]}*, du bist die Person, die ich mir schon lange gewünscht habe!* 💘\n\n` +
    'Ich wollte dir das schon lange gestehen, aber ich war zu schüchtern. 😳💖'
  ];

  // Randomly select one of the confession messages
  let confessionMessage = confessionMessages[Math.floor(Math.random() * confessionMessages.length)];

  // Send the confession message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: confessionMessage,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['confess [@user]'];
handler.tags = ['fun', 'love'];
handler.command = /^confess$/i;

module.exports = handler;
