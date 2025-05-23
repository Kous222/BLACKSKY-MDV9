const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Prüfen, ob ein Benutzer erwähnt wurde
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❌ *Bitte erwähne die Person, die du lecken möchtest!*');
  }

  // Nachricht zusammenbauen
  let senderTag = '@' + m.sender.split('@')[0];
  let targetTag = '@' + mentioned.split('@')[0];
  let message = `${senderTag} leckt ${targetTag} 👅`;

  // Pfad zur GIF-/Video-Datei
  const gifPath = path.join(__dirname, '../gifs/leck.mp4'); // Datei muss existieren!

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Video für diesen Befehl wurde nicht gefunden.');
  }

  // Video/GIF senden mit Caption und Erwähnungen
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['leck [@user]'];
handler.tags = ['fun'];
handler.command = /^leck$/i;

module.exports = handler;
