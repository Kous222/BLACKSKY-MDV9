const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du furzen möchtest!');
  }

  // Generate the message in the format "@sender furzt auf @user"
  let message = `💨 @${m.sender.split('@')[0]} furzt auf @${mentioned.split('@')[0]} 🤢`;

  // Path to the fart GIF/video
  const gifPath = path.join(__dirname, '../gifs/furz.mp4'); // Stelle sicher, dass diese Datei existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Furz-Video wurde nicht gefunden.');
  }

  // Send the message with the video and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['furze auf [@user]'];
handler.tags = ['fun'];
handler.command = /^furze$/i;

module.exports = handler;
