const { deleteUserRank, getUserRank } = require('../lib/rank');

let handler = async (m, { args, isOwner }) => {
  if (!isOwner) return m.reply('❌ Nur der Bot-Besitzer kann Ränge löschen.');

  // Versuche zuerst die Nummer aus den Argumenten zu bekommen
  let number = args[0]?.replace(/[^0-9]/g, '');

  // Oder nutze die erste erwähnte JID
  let userJid = number ? number + '@s.whatsapp.net' : m.mentionedJid?.[0];

  if (!userJid) {
    return m.reply('❗ Bitte gib eine Nummer an oder markiere den Benutzer mit @.\n\nBeispiel:\n.delrank @49123456789\n.delrank 49123456789');
  }

  try {
    const currentRank = await getUserRank(userJid);
    if (currentRank === 'user') {
      return m.reply('ℹ️ Dieser Benutzer hat keinen speziellen Rang.');
    }

    await deleteUserRank(userJid);

    const displayNumber = userJid.split('@')[0];
    return m.reply(`✅ Der Rang von @${displayNumber} wurde erfolgreich gelöscht.`, null, {
      mentions: [userJid]
    });
  } catch (error) {
    console.error(error);
    return m.reply('❌ Fehler beim Löschen des Rangs.');
  }
};

handler.command = ['delrank'];
handler.help = ['delrank @user', 'delrank <nummer>'];
handler.tags = ['owner'];
handler.owner = true;

module.exports = handler;
