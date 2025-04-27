let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, mit der du den Doggy-Style machen möchtest!');
  }

  // Generate the message in the format "@sender nimmt @user doggy"
  let message = `@${m.sender.split('@')[0]} nimmt @${mentioned.split('@')[0]} doggy`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['doggy [@user]'];
handler.tags = ['fun'];
handler.command = /^doggy$/i;

module.exports = handler;