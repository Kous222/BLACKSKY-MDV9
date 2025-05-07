const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du reiten möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Generate the message in the format "@sender reitet auf @user 🫦"
  let message = `@${m.sender.split('@')[0]} reitet auf @${mentioned.split('@')[0]} 🫦`;

  const gifPath = path.join(__dirname, '../gifs/reiteauf.mp4');

  if (!fs.existsSync(gifPath)) return m.reply('Die Datei "reiteauf.mp4" wurde im Ordner "gifs" nicht gefunden.');

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [mentioned, m.sender] // Mention both the sender and the mentioned user
  }, { quoted: m });
};

handler.help = ['reiteauf [@user]'];
handler.tags = ['fun'];
handler.command = /^reiteauf$/i;

module.exports = handler;
