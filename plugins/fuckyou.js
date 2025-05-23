const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : '';
  const jid = text ? `${text.replace(/[^0-9]/g, '')}@s.whatsapp.net` : '';
  const messages = [
    `Hmm... jemand hier hat wohl einen *Ehren-Mittelfinger* verdient.`,
    `Herzlichen Glückwunsch! Du wurdest offiziell mit einem 🖕🏽 ausgezeichnet.`,
    `Weil Worte manchmal nicht reichen: 🖕🏽`,
    `Persönlich überreicht vom Bot-Team: 🖕🏽`,
    `Bots können keine Gefühle zeigen... außer diesen hier: 🖕🏽`,
  ];

  const caption = `${messages[Math.floor(Math.random() * messages.length)]}${target ? `\n\n${target}` : ''}`;
  const gifPath = path.join(__dirname, '../gifs/fuckyou.mp4');

  if (!fs.existsSync(gifPath)) {
    return m.reply('Die Datei "fuckyou.mp4" wurde im Ordner "gifs" nicht gefunden.');
  }

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption,
    mentions: jid ? [jid] : []
  }, { quoted: m });
};

handler.command = ['fuckyou'];
handler.help = ['fuckyou [@Nummer]'];
handler.tags = ['fun'];

module.exports = handler;
