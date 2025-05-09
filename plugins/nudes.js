const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Prüfe, ob eine Person erwähnt wurde
  const mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❗ Bitte erwähne die Person, von der du Nudes willst!\nBeispiel: `.nudes @Benutzer`');
  }

  let sender = m.sender;

  // Nachricht generieren
  const message = `@${sender.split('@')[0]} fragt @${mentioned.split('@')[0]} nach nudes💦`;

  // Pfad zum Video
  const gifPath = path.join(__dirname, '../gifs/nudes.mp4'); // Stelle sicher, dass diese Datei vorhanden ist

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Nudes-GIF wurde nicht gefunden.');
  }

  // Nachricht mit Video und Mentions senden
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [sender, mentioned]
  }, { quoted: m });
};

handler.command = ['nudes'];
handler.help = ['nudes [@Benutzer]'];
handler.tags = ['fun'];

module.exports = handler;
