let handler = async (m, { text, args, participants }) => {
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  let size = Math.floor(Math.random() * 30) + 60; // 60–89 cm
  let boobs = '(' + ' '.repeat(Math.floor(size / 10)) + ')';

  let reaction = '';
  if (size <= 70) {
    reaction = 'Klein aber fein!';
  } else if (size <= 80) {
    reaction = 'Ganz schön kurvig!';
  } else {
    reaction = 'WOW, da wird man(n) nervös!';
  }

  let message = `*Brustumfang von @${target.split('@')[0]}*\n\n${boobs}\n\n*${size} cm*\n${reaction}`;
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['boobs [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^boobs$/i;
module.exports = handler;
