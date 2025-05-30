async function listAfkHandler(m, { conn }) {
  let users = Object.entries(global.db.data.users)
    .filter(([_, user]) => user.afk > -1)
    .map(([jid, user]) => {
      let name = user.name || conn.getName(jid);
      let reason = user.afkReason ? `📌 *Grund:* ${user.afkReason}` : '📌 *Grund:* Kein Grund angegeben';
      let duration = formatTime(new Date() - user.afk);
      return `👤 *${name}*\n⏱️ *AFK seit:* ${duration}\n${reason}`;
    });

  if (users.length > 0) {
    await conn.sendMessage(m.chat, {
      text: `📋 *AFK-Nutzerliste:*\n\n${users.join('\n\n')}`,
      contextInfo: {
        externalAdReply: {
          title: 'AFK-Übersicht',
          thumbnailUrl: 'https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/mzx1qcg.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } else {
    await conn.reply(m.chat, '❌ Es gibt derzeit keine AFK-Nutzer.', m);
  }
}

listAfkHandler.help = ['listafk'];
listAfkHandler.tags = ['group'];
listAfkHandler.command = /^listafk$/i;

module.exports = listAfkHandler;

function formatTime(ms) {
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);

  let timeString = [];
  if (days) timeString.push(`${days} Tag${days !== 1 ? 'e' : ''}`);
  if (hours) timeString.push(`${hours} Std.`);
  if (minutes) timeString.push(`${minutes} Min.`);
  if (seconds || timeString.length === 0) timeString.push(`${seconds} Sek.`);

  return timeString.join(', ');
}
