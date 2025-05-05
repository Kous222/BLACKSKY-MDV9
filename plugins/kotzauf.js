let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kotzen möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Generate the kotzauf message
  let kotzaufMessage = `🤢 *@${mentioned.split('@')[0]}*, ich kotze jetzt auf dich! 🤢\n\n` +
                       'Du hast es wirklich verdient, viel Spaß! 😂🤮';

  // Send the GIF (kotzauf.gif) first
  await conn.sendMessage(m.chat, {
    video: { url: './gifs/kotzauf.gif' },
    caption: kotzaufMessage, // This is the text message with mentions
    mentions: [mentioned], // Mention the user in the message
    gifPlayback: true, // Ensure the video plays as a GIF
  }, { quoted: m });
};

handler.help = ['kotzauf [@user]'];
handler.tags = ['fun'];
handler.command = /^kotzauf$/i;

module.exports = handler;
