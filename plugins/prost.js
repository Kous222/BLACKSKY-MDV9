let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, mit der du anstoßen möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Create the prost message
  let prostMessage = `🍻 *@${mentioned.split('@')[0]}*, stoßen wir gemeinsam an! 🍻\n\n` +
                     'Möge dieser Moment voller Freude und guter Laune sein! 🥂💫';

  // Send the GIF (prost.gif) first
  await conn.sendMessage(m.chat, {
    video: { 
      url: './gifs/prost.gif', // Ensure the path is correct
      caption: prostMessage,   // The text message with mentions
      mentions: [mentioned],   // Mention the user
      gifPlayback: true,       // Ensure the video plays as a GIF
      mimetype: 'video/gif'    // Explicitly set the mimetype to GIF
    }
  }, { quoted: m });
};

handler.help = ['prost [@user]'];
handler.tags = ['fun'];
handler.command = /^prost$/i;

module.exports = handler;
