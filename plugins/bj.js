const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du ein BJ geben möchtest!');
  }

  // Generate the message in the format "@sender gibt @user ein BJ🍌"
  let message = `@${m.sender.split('@')[0]} gibt @${mentioned.split('@')[0]} ein BJ🍌`;

  // Pfad zum GIF/Video
  const gifPath = path.join(__dirname, '../gifs/bj.mp4'); // Stelle sicher, dass diese Datei existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das BJ-GIF wurde nicht gefunden.');
  }

  // Send the message with the GIF, caption, and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['bj [@user]'];
handler.tags = ['fun'];
handler.command = /^bj$/i;

module.exports = handler;
