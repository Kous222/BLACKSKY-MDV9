const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du peitschen möchtest!');
  }

  let senderName = await conn.getName(m.sender);
  let mentionedName = await conn.getName(mentioned);

  let whipMessage = `⚡ *@${m.sender.split('@')[0]} hat @${mentioned.split('@')[0]} mit der Peitsche geschlagen!* ⚡\n` +
    `@${m.sender.split('@')[0]} hat die Peitsche gezückt und @${mentioned.split('@')[0]} gepeitscht! 😱💥`;

  const gifPath = path.join(__dirname, '../gifs/peitsch.mp4');

  if (!fs.existsSync(gifPath)) return m.reply('Die Datei "peitsch.mp4" wurde im Ordner "gifs" nicht gefunden.');

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: whipMessage,
    mentions: [mentioned, m.sender],
  }, { quoted: m });
};

handler.help = ['peitsch [@user]'];
handler.tags = ['fun', 'interaction'];
handler.command = /^peitsch$/i;
handler.group = true;

module.exports = handler;
