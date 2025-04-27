let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du peitschen möchtest!');
  }

  let senderName = await conn.getName(m.sender);
  let mentionedName = await conn.getName(mentioned);

  let whipMessage = `⚡ *@${m.sender.split('@')[0]} hat @${mentioned.split('@')[0]} mit der Peitsche geschlagen!* ⚡\n` +
    `${senderName} hat die Peitsche gezückt und ${mentionedName} gepeitscht! 😱💥`;

  await conn.sendMessage(m.chat, {
    text: whipMessage,
    mentions: [mentioned, m.sender],
  }, { quoted: m });
};

handler.help = ['peitsche @user'];
handler.tags = ['fun', 'interaction'];
handler.command = /^peitsche$/i;
handler.group = true;

module.exports = handler;