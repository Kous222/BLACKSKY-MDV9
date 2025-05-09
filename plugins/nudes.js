const fs = require('fs');
const path = require('path');

let handler = async (m, { text, conn }) => {
  // Check if a target user is provided
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : null;

  if (!target) {
    return m.reply('❗ Bitte gib einen Benutzer an, den du nach nudes fragen möchtest. Beispiel: `.nudes @Benutzer`');
  }

  let sender = m.sender;

  // Generate the message asking for nudes
  let message = `@${sender.split('@')[0]} fragt ${target} nach nudes💦`;

  // Pfad zum GIF/Video
  const gifPath = path.join(__dirname, '../gifs/nudes.mp4'); // Stelle sicher, dass diese Datei existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Nudes-GIF wurde nicht gefunden.');
  }

  // Send the message with the GIF, caption, and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [sender, target]
  }, { quoted: m });
};

handler.command = ['nudes'];
handler.help = ['nudes [@Benutzer]'];
handler.tags = ['fun'];

module.exports = handler;
