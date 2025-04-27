 let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du lecken möchtest!');
  }

  // Generate the message in the format "@sender leckt @user 👅"
  let message = `@${m.sender.split('@')[0]} leckt @${mentioned.split('@')[0]} 👅`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['leck [@user]'];
handler.tags = ['fun'];
handler.command = /^leck$/i;

module.exports = handler;