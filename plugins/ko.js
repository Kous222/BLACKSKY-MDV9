let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du K.O. schlagen möchtest!');
  }

  // Generate the message in the format "@sender schlägt @user K.O💀"
  let message = `@${m.sender.split('@')[0]} schlägt @${mentioned.split('@')[0]} K.O💀`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['ko [@user]'];
handler.tags = ['fun'];
handler.command = /^ko$/i;

module.exports = handler;