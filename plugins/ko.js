const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Prüfe, ob jemand erwähnt wurde
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❌ *Bitte erwähne die Person, die du K.O. schlagen möchtest!*');
  }

  // Nachricht aufbauen
  let senderTag = '@' + m.sender.split('@')[0];
  let targetTag = '@' + mentioned.split('@')[0];
  let message = `${senderTag} schlägt ${targetTag} K.O 💀`;

  // Pfad zur lokalen Video-/GIF-Datei
  const gifPath = path.join(__dirname, '../gifs/ko.mp4'); // Stelle sicher, dass diese Datei existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das K.O.-Video wurde nicht gefunden.');
  }

  // Sende das Video mit Caption und Erwähnungen
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['ko [@user]'];
handler.tags = ['fun'];
handler.command = /^ko$/i;

module.exports = handler;
