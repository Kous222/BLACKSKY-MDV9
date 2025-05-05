let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du reiten möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Generate the message in the format "@sender reitet auf @user"
  let message = `@${m.sender.split('@')[0]} reitet auf @${mentioned.split('@')[0]}`;

  // Send the GIF (reiteauf.gif) first
  await conn.sendMessage(m.chat, {
    video: { url: './gifs/reiteauf.gif' },
    caption: message, // This is the text message with mentions
    mentions: [m.sender, mentioned], // Mention both the sender and the mentioned user
    gifPlayback: true, // Ensure the video plays as a GIF
  }, { quoted: m });
};

handler.help = ['reiteauf [@user]'];
handler.tags = ['fun'];
handler.command = /^reiteauf$/i;

module.exports = handler;
