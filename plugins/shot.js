const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte markiere die Person, auf die du schießen möchtest!');
  }

  // List of funny random reactions
  let reactions = [
    '💥 Volltreffer! Direkt ins Herz!',
    '😱 Kritischer Treffer! Das wird wehtun!',
    '🎯 Präzise wie ein Scharfschütze!',
    '😂 Verfehlt! Versuch es nochmal!',
    '😎 Mit Stil getroffen!',
    '🤕 Autsch! Das hat gesessen!',
    '🤡 Der Schuss ging nach hinten los!',
    '🛡️ Geblockt! Keine Wirkung!'
  ];

  // Pick a random reaction
  let randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

  // Create the main shot message
  let message = `🔫 *@${m.sender.split('@')[0]}* schießt auf *@${mentioned.split('@')[0]}*! ${randomReaction}`;

  // Pfad zum GIF/Video
  const gifPath = path.join(__dirname, '../gifs/shot.mp4'); // Stelle sicher, dass diese Datei existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Schuss-GIF wurde nicht gefunden.');
  }

  // Send the message with the GIF, caption, and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['shot [@user]'];
handler.tags = ['fun'];
handler.command = /^shot$/i;

module.exports = handler;
