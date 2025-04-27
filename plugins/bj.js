let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du ein BJ geben möchtest!');
  }

  // Generate the message in the format "@sender gibt @user ein BJ🍌"
  let message = `@${m.sender.split('@')[0]} gibt @${mentioned.split('@')[0]} ein BJ🍌`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['bj [@user]'];
handler.tags = ['fun'];
handler.command = /^bj$/i;

module.exports = handler;