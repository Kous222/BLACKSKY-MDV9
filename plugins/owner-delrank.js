const { deleteUserRank, getUserRank } = require('../lib/rank');

let handler = async (m, { args, isOwner }) => {
  if (!isOwner) return m.reply('❌ Nur der Bot-Besitzer kann Ränge löschen.');

  const number = args[0]?.replace(/[^0-9]/g, '');
  if (!number) return m.reply('❗ Bitte gib eine gültige Nummer an. Beispiel: .deleterank 49123456789');

  const userJid = number + '@s.whatsapp.net';

  const currentRank = await getUserRank(userJid);
  if (currentRank === 'Kein Rang') {
    return m.reply('❌ Dieser Benutzer hat keinen Rang.');
  }

  await deleteUserRank(userJid);

  await m.reply(`✅ Der Rang von @${number} wurde erfolgreich gelöscht.`, null, {
    mentions: [userJid]
  });
};

handler.command = ['deleterank'];
handler.help = ['deleterank <nummer>'];
handler.tags = ['admin'];
handler.owner = true;

module.exports = handler;
