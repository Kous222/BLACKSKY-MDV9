let handler = async (m, { conn, participants, text }) => {
  if (!m.isGroup) return m.reply('❗ Dieser Befehl funktioniert nur in Gruppen.');

  let mentioned = m.mentionedJid && m.mentionedJid[0];
  let targetUser;

  if (mentioned) {
    targetUser = mentioned;
  } else {
    // Wenn kein User erwähnt wurde, zufälligen Nutzer auswählen
    const randomUser = participants[Math.floor(Math.random() * participants.length)];
    targetUser = randomUser.id;
  }

  const senderUsername = '@' + m.sender.split('@')[0];
  const targetUsername = '@' + targetUser.split('@')[0];

  const message = `${senderUsername} leckt die Eier von ${targetUsername}... lecker!😋`;

  await conn.sendMessage(m.chat, { text: message, mentions: [m.sender, targetUser] }, { quoted: m });
};

handler.command = ['leckeier', 'leckeierchen'];
handler.help = ['leckeier @user', 'leckeier'];
handler.tags = ['fun'];
handler.group = true;

module.exports = handler;
