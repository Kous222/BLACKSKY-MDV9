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

  // Berechne zufällig den Wert der "Liebe"
  let lovePercentage = Math.floor(Math.random() * 101);

  // Nachricht mit der "Liebe" der beiden
  let loveMessage = `💖 *Liebecheck* 💖\n\n` +
    `@${user1.split('@')[0]} & @${user2.split('@')[0]} haben eine Liebe von *${lovePercentage}%* ! 💌\n\n` +
    `Das sieht nach einer echten Beziehung aus! 🥰💘`;

  await conn.sendMessage(m.chat, {
    text: loveMessage,
    mentions: [user1, user2]
  }, { quoted: m });
};

handler.help = ['lovecheck [@user1] [@user2]'];
handler.tags = ['fun', 'love'];
handler.command = /^lovecheck$/i;

module.exports = handler;
