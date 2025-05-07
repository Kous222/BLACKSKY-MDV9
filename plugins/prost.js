const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, mit der du anstoßen möchtest!');
  }

  let name = await conn.getName(mentioned);

  let prostMessage = `🍻 *@${mentioned.split('@')[0]}*, stoßen wir gemeinsam an! 🍻\n\n` +
                     'Möge dieser Moment voller Freude und guter Laune sein! 🥂💫';

  const gifPath = path.join(__dirname, '../gifs/prost.mp4');

  if (!fs.existsSync(gifPath)) {
    return m.reply('Die Datei "prost.mp4" wurde im Ordner "gifs" nicht gefunden.');
  }

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: prostMessage,
    mentions: [mentioned]
  }, { quoted: m });
};

handler.help = ['prost [@user]'];
handler.tags = ['fun'];
handler.command = /^prost$/i;

module.exports = handler;
