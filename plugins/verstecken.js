const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Check if user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❌ *Bitte erwähne die Person, vor der du dich verstecken möchtest!*');
  }

  // Build the message
  let senderTag = '@' + m.sender.split('@')[0];
  let targetTag = '@' + mentioned.split('@')[0];
  let message = `${senderTag} versteckt sich vor ${targetTag} 🏃💨`;

  // Pfad zum Video/GIF
  const gifPath = path.join(__dirname, '../gifs/versteckt.mp4'); // Stelle sicher, dass diese Datei vorhanden ist

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Versteck-Video wurde nicht gefunden.');
  }

  // Send video with caption and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['versteckt [@user]'];
handler.tags = ['fun'];
handler.command = /^versteckt$/i;

module.exports = handler;
