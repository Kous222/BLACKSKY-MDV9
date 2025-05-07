const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kotzen möchtest!');
  }

  let name = await conn.getName(mentioned);

  let kotzaufMessage = `🤢 *@${mentioned.split('@')[0]}*, ich kotze jetzt auf dich! 🤢\n\n` +
                       'Du hast es wirklich verdient, viel Spaß! 😂💩';

  const gifPath = path.join(__dirname, '../gifs/kotzauf.mp4');

  if (!fs.existsSync(gifPath)) return m.reply('Die Datei "kotzauf.mp4" wurde im Ordner "gifs" nicht gefunden.');

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: kotzaufMessage,
    mentions: [mentioned]
  }, { quoted: m });
};

handler.help = ['kotzauf [@user]'];
handler.tags = ['fun'];
handler.command = /^kotzauf$/i;

module.exports = handler;
