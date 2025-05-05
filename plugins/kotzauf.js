let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kotzen möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Create the kotzauf message
  let kotzaufMessage = `🤢 *@${mentioned.split('@')[0]}*, ich kotze jetzt auf dich! 🤢\n\n` +
                       'Du hast es wirklich verdient, viel Spaß! 😂🤮';

  // Send the kotzauf message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: kotzaufMessage,
    mentions: [mentioned] // This will mention the user like WhatsApp does
  });

  // Send the GIF as a video (animated)
  await conn.sendMessage(m.chat, {
    video: { 
      url: './gifs/kotzauf.gif', // Path to your gif file
      caption: '🤢 Hier ist dein Kotzauf GIF!',
      mimetype: 'video/gif'
    }
  });
};

handler.help = ['kotzauf [@user]'];
handler.tags = ['fun'];
handler.command = /^kotzauf$/i;

module.exports = handler;
