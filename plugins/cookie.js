let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, reply with a message for the sender
  if (!mentioned) {
    return m.reply('Hier ist ein 🍪 für dich!');
  }

  // If a user is mentioned, give them the cookie
  let name = await conn.getName(mentioned);
  let message = `🍪 *@${mentioned.split('@')[0]}*, hier ist ein Cookie für dich! 🎉`;

  // Send the cookie message with the mention
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned]  // Mention the user
  }, { quoted: m });
};

handler.help = ['cookie [@user]'];
handler.tags = ['fun'];
handler.command = /^cookie$/i;

module.exports = handler;
