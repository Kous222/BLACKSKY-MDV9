const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Check if user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❌ *Bitte erwähne die Person, vor der du unsichtbar sein willst!*');
  }

  // Generate the message
  let senderTag = '@' + m.sender.split('@')[0];
  let targetTag = '@' + mentioned.split('@')[0];
  let message = `${senderTag} ist unsichtbar vor ${targetTag} 🕵️‍♂️❌`;

  // Pfad zum GIF/Video
  const gifPath = path.join(__dirname, '../gifs/unsichtbar.mp4'); // Stelle sicher, dass diese Datei existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Unsichtbar-Video wurde nicht gefunden.');
  }

  // Send video with caption and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['unsichtbar [@user]'];
handler.tags = ['fun'];
handler.command = /^unsichtbar$/i;

module.exports = handler;
