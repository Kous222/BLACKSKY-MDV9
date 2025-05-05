let handler = async (m, { conn, participants }) => {
  // Check if a user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kacken möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Send the kackauf message with mention
  let kackaufMessage = `💩 *@${mentioned.split('@')[0]}*, ich kacke jetzt auf dich! 💩\n\n` +
                       'Ich hoffe, du bist bereit für das unvergessliche Erlebnis! 😂';

  await conn.sendMessage(m.chat, {
    text: kackaufMessage,
    mentions: [mentioned] // This will mention the user like WhatsApp does
  });

  // Send the GIF as a video (animated)
  await conn.sendMessage(m.chat, {
    video: { 
      url: './gifs/kackauf.gif', // Path to your gif file
      caption: '💩 Hier ist dein GIF!',
      mimetype: 'video/gif'
    }
  });
};

handler.help = ['kackauf [@user]'];
handler.tags = ['fun'];
handler.command = /^kackauf$/i;

module.exports = handler;
