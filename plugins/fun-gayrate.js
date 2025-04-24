let handler = async (m, { text, args, participants }) => {
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  let percent = Math.floor(Math.random() * 101); // 0–100 %
  let message = `@${target.split('@')[0]} ist zu *${percent}% gay*\n\n${
    percent > 90
      ? 'Regenbogen-Ikone!'
      : percent > 50
      ? 'Da schlummert was...'
      : percent > 20
      ? 'Ein Hauch von Glitzer'
      : 'Sehr hetero... oder etwa doch nicht?'
  }`;

  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['gayrate [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^gay(rate)?$/i;
module.exports = handler;
