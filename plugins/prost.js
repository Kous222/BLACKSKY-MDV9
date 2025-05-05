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
    video: { url: './gifs/prost.gif' },
    caption: prostMessage, // This is the text message with mentions
    mentions: [mentioned], // Mention the user in the message
    gifPlayback: true, // Ensure the video plays as a GIF
  }, { quoted: m });
};

handler.help = ['prost [@user]'];
handler.tags = ['fun'];
handler.command = /^prost$/i;

module.exports = handler;
