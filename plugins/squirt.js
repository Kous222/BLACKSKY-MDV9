const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Check if a user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du squirtest!');
  }

  // Create message
  let senderTag = '@' + m.sender.split('@')[0];
  let targetTag = '@' + mentioned.split('@')[0];
  let message = `${senderTag} squirtet auf ${targetTag} 💦💦`;

  // Path to video or gif file
  const gifPath = path.join(__dirname, '../gifs/squirt.mp4');

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Video für diesen Befehl wurde nicht gefunden.');
  }

  // Send video with mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.help = ['squirt [@user]'];
handler.tags = ['fun'];
handler.command = /^squirt$/i;

module.exports = handler;
