let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du nach einer PN fragen möchtest!');
  }

  let senderName = await conn.getName(m.sender);
  let mentionedName = await conn.getName(mentioned);

  let askMessage = `@${m.sender.split('@')[0]} fragt @${mentioned.split('@')[0]} nach PN👀😏`;

  await conn.sendMessage(m.chat, {
    text: askMessage,
    mentions: [mentioned, m.sender],
  }, { quoted: m });
};

handler.help = ['pnfrage @user'];
handler.tags = ['fun', 'interaction'];
handler.command = /^pnfrage$/i;
handler.group = true;

module.exports = handler;