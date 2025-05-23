const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  // Check if user is mentioned
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❌ *Bitte erwähne die Person, die du in den Müll werfen möchtest!*');
  }

  // Create message with @mentions
  let senderTag = '@' + m.sender.split('@')[0];
  let targetTag = '@' + mentioned.split('@')[0];
  let trashMessages = [
    `${senderTag} wirft ${targetTag} in den Müll! 🗑️💥`,
    `${senderTag} hat beschlossen, ${targetTag} im Müll zu entsorgen! 🗑️🙃`,
    `${senderTag} packt ${targetTag} in den Mülleimer! 🗑️🔥`,
    `${senderTag} hat den ultimativen Müllkampf gestartet und wirft ${targetTag} in den Abfall! 🗑️💪`,
    `${senderTag} hat den Müllberg erreicht und schubst ${targetTag} direkt rein! 🗑️😈`
  ];

  let message = trashMessages[Math.floor(Math.random() * trashMessages.length)];

  // Pfad zur lokalen GIF/Video-Datei
  const gifPath = path.join(__dirname, '../gifs/trash.mp4'); // Stelle sicher, dass 'gifs/trash.mp4' existiert

  if (!fs.existsSync(gifPath)) {
    return m.reply('❌ Das Trash-Video wurde nicht gefunden.');
  }

  // Send video with message and mentions
  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: message,
    mentions: [m.sender, mentioned]
  }, { quoted: m });
};

handler.command = ['trash', 'wirfinmüll'];
handler.help = ['trash [@user]'];
handler.tags = ['fun'];

module.exports = handler;
