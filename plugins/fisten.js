const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du fisten möchtest! 😳');
  }

  if (mentioned === m.sender) {
    return m.reply('Du kannst dich nicht selbst fisten! 😂');
  }

  let senderName = await conn.getName(m.sender);
  let targetName = await conn.getName(mentioned);

  const gifPath = path.join(__dirname, '../gifs/fistet.mp4'); // Stelle sicher, dass du diese Datei hast

  let messageText = `🥵 *@${m.sender.split('@')[0]}* fistet *@${mentioned.split('@')[0]}*! 🤯💥\n\n` +
                    `Das war intensiv...`;

  if (fs.existsSync(gifPath)) {
    await conn.sendMessage(m.chat, {
      video: fs.readFileSync(gifPath),
      gifPlayback: true,
      caption: messageText,
      mentions: [m.sender, mentioned]
    }, { quoted: m });
  } else {
    await m.reply(`${messageText}\n\n⚠️ (Das passende Video konnte nicht gefunden werden.)`, null, {
      mentions: [m.sender, mentioned]
    });
  }
};

handler.help = ['fistet [@user]'];
handler.tags = ['fun'];
handler.command = /^fistet$/i;

module.exports = handler;
