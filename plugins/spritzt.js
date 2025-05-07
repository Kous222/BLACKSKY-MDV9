const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du spritzt!');
  }

  let message = `@${m.sender.split('@')[0]} spritzt auf @${mentioned.split('@')[0]} 💦💦`;

  // Pfad zur festen GIF-Datei
  const gifPath = path.join(__dirname, '../gifs/spritzt.mp4');

  // Prüfen, ob die Datei existiert
  if (!fs.existsSync(gifPath)) {
    return m.reply('Die Datei "spritzt.gif" wurde im Ordner "gifs" nicht gefunden.');
  }

  // Sende das GIF mit Erwähnungen und Text
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['spritzt [@user]'];
handler.tags = ['fun'];
handler.command = /^spritzt$/i;

module.exports = handler;
