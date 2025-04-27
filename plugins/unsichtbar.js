let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, vor der du unsichtbar bist!');
  }

  // Generate the message in the format "@sender ist unsichtbar vor @user"
  let message = `@${m.sender.split('@')[0]} ist unsichtbar vor @${mentioned.split('@')[0]} 🕵️‍♂️❌`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['unsichtbar [@user]'];
handler.tags = ['fun'];
handler.command = /^unsichtbar$/i;

module.exports = handler;