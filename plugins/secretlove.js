let handler = async (m, { conn, text, participants }) => {
  // Überprüfen, ob zwei Nutzer im Text erwähnt wurden
  let mentioned = m.mentionedJid && m.mentionedJid.length >= 2 
    ? [m.mentionedJid[0], m.mentionedJid[1]]
    : participants.slice(0, 2).map(p => p.id);

  let user1 = mentioned[0];
  let user2 = mentioned[1];

  // Erhalte die Namen der Nutzer
  let name1 = await conn.getName(user1);
  let name2 = await conn.getName(user2);

  // Berechne zufällig, ob es geheime Gefühle gibt
  let hasSecretFeelings = Math.random() < 0.5; // 50% Chance

  let secretMessage = '';

  if (hasSecretFeelings) {
    secretMessage = `💖 *Geheime Liebe* 💖\n\n` +
      `@${user1.split('@')[0]} hat heimlich Gefühle für @${user2.split('@')[0]}! 😏💘\n\n` +
      `Es scheint, als ob sich da etwas ganz Besonderes entwickelt... 😍`;
  } else {
    secretMessage = `💔 *Geheime Liebe* 💔\n\n` +
      `@${user1.split('@')[0]} hat keine geheimen Gefühle für @${user2.split('@')[0]}! 😅💬\n\n` +
      `Aber wer weiß, vielleicht ändern sich die Dinge ja noch!`;
  }

  await conn.sendMessage(m.chat, {
    text: secretMessage,
    mentions: [user1, user2]
  }, { quoted: m });
};

handler.help = ['secretlove [@user1] [@user2]'];
handler.tags = ['fun', 'love'];
handler.command = /^secretlove$/i;

module.exports = handler;
