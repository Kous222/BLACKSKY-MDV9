const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kacken möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Create the kackauf message
  let kackaufMessage = `💩 *@${mentioned.split('@')[0]}*, ich kacke jetzt auf dich! 💩\n\n` +
                       'Ich hoffe, du bist bereit für das unvergessliche Erlebnis! 😂';

  const gifPath = path.join(__dirname, '../gifs/kackauf.mp4');

  if (!fs.existsSync(gifPath)) return m.reply('Die Datei "kackauf.mp4" wurde im Ordner "gifs" nicht gefunden.');

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: kackaufMessage,
    mentions: [mentioned]
  }, { quoted: m });
};

handler.help = ['kackauf [@user]'];
handler.tags = ['fun'];
handler.command = /^kackauf$/i;

module.exports = handler;
