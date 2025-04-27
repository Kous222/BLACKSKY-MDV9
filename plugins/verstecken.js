let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, vor der du dich verstecken möchtest!');
  }

  // Generate the message in the format "@sender versteckt sich vor @user"
  let message = `@${m.sender.split('@')[0]} versteckt sich vor @${mentioned.split('@')[0]} 🏃💨`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['versteckt [@user]'];
handler.tags = ['fun'];
handler.command = /^versteckt$/i;

module.exports = handler;