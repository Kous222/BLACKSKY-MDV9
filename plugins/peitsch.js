let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du peitschen möchtest!');
  }

  let senderName = await conn.getName(m.sender);
  let mentionedName = await conn.getName(mentioned);

  let whipMessage = `⚡ *@${m.sender.split('@')[0]} hat @${mentioned.split('@')[0]} mit der Peitsche geschlagen!* ⚡\n` +
    `${senderName} hat die Peitsche gezückt und ${mentionedName} gepeitscht! 😱💥`;

  // Send the GIF (peitsche.gif) first
  await conn.sendMessage(m.chat, {
    video: { url: './gifs/peitsche.gif' },
    caption: whipMessage, // This is the text message with mentions
    mentions: [mentioned, m.sender], // Mention the sender and mentioned user
    gifPlayback: true, // Ensure the video plays as a GIF
  }, { quoted: m });
};

handler.help = ['peitsche @user'];
handler.tags = ['fun', 'interaction'];
handler.command = /^peitsche$/i;
handler.group = true;

module.exports = handler;
