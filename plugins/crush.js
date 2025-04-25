let handler = async (m, { conn, participants }) => {
  // Wähle eine zufällige Person aus, die nicht der Bot oder der Absender ist
  let filtered = participants.filter(p => p.id !== conn.user.jid && p.id !== m.sender);
  if (!filtered.length) return m.reply('Ich finde niemanden zum Verlieben...');
  let target = filtered[Math.floor(Math.random() * filtered.length)].id;

  let name = await conn.getName(target);
  let senderName = await conn.getName(m.sender);

  let text = `💘 *Geheime Offenbarung!* 💘\n\n` +
             `@${target.split('@')[0]} hat heimlich einen *Crush* auf @${m.sender.split('@')[0]}!\n\n` +
             `Was wirst du tun, ${senderName}? Vielleicht erwidert sich die Liebe? 😳`;

  await conn.sendMessage(m.chat, {
    text,
    mentions: [target, m.sender]
  }, { quoted: m });
};

handler.help = ['crush'];
handler.tags = ['fun'];
handler.command = /^crush$/i;

module.exports = handler;
