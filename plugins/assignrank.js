const { setUserRank } = require('../lib/rank');

let handler = async (m, { args, conn }) => {
  const ownerJid = global.owner + '@s.whatsapp.net';
  if (m.sender !== ownerJid) return m.reply('❌ Nur der Bot-Besitzer kann Ränge vergeben.');

  const number = args[0]?.replace(/[^0-9]/g, '');
  const rank = args[1]?.toLowerCase();

  const validRanks = ['support', 'moderator', 'teamleiter', 'manager'];
  if (!number || !rank || !validRanks.includes(rank)) {
    return m.reply(`❗ Verwendung:\n.setrank 49123456789 moderator\n\nGültige Ränge: ${validRanks.join(', ')}`);
  }

  const userJid = number + '@s.whatsapp.net';

  await setUserRank(userJid, rank);

  await conn.sendMessage(m.chat, {
    text: `✅ Der Rang *${rank}* wurde erfolgreich an @${number} vergeben.`,
    mentions: [userJid]
  });
};

handler.command = ['setrank'];
handler.help = ['setrank <nummer> <rang>'];
handler.tags = ['owner'];
handler.rowner = true;

module.exports = handler;
