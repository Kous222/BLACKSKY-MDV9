let handler = async (m, { text }) => {
  let user = global.db.data.users[m.sender];
  user.afk = +new Date();
  user.afkReason = text;

  const username = `@${m.sender.split`@`[0]}`;
  const reason = text ? `📝 *Grund:* ${text}` : '📭 *Kein Grund angegeben*';
  const time = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  let afkMessage = `🌙 *AFK-Modus aktiviert!*\n\n👤 *Benutzer:* ${username}\n${reason}\n⏰ *Seit:* ${time}`;

  await m.reply(afkMessage, null, {
    mentions: [m.sender]
  });
};

handler.help = ['afk [grund]'];
handler.tags = ['spielen'];
handler.command = /^afk$/i;

module.exports = handler;
