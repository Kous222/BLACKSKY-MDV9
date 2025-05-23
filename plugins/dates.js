let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte markiere die Person, die du nach einem Date fragen möchtest!');
  }

  // Create the main message
  let message = `💌 *@${m.sender.split('@')[0]}* fragt *@${mentioned.split('@')[0]}* nach einem Date! 💖`;

  // Send the message with mentions
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['dates [@user]'];
handler.tags = ['fun', 'love'];
handler.command = /^dates$/i;

module.exports = handler;