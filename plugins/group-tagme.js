
let handler = async (m, { conn, text }) => {

  let tag = `👋 Hey, schau mal her! ${'@' + m.sender.replace(/@.+/, '')} ist hier! 🔥`;
  let mentionedJid = [m.sender];

  conn.reply(m.chat, tag, m, { contextInfo: { mentionedJid } });
}

handler.help = ['tagme'];
handler.tags = ['group'];
handler.command = /^tagme$/i;

handler.group = true;

module.exports = handler;
