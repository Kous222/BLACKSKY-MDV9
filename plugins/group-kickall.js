let handler = async (m, { conn, participants, isBotAdmin, isAdmin }) => {
  if (!m.isGroup) throw '❗ Dieser Befehl kann nur in Gruppen verwendet werden.';
  if (!isAdmin) throw '❗ Nur Admins dürfen diesen Befehl verwenden.';
  if (!isBotAdmin) throw '❗ Ich muss Admin sein, um Mitglieder zu entfernen.';

  let kicked = [];
  let failed = [];

  for (const user of participants) {
    const jid = user.id;

    if (jid === m.sender || jid === conn.user.jid || user.admin === 'superadmin' || user.admin === 'admin') continue;

    try {
      await conn.groupParticipantsUpdate(m.chat, [jid], 'remove');
      kicked.push(jid);
    } catch (e) {
      failed.push(jid);
    }
  }

  let message = `👥 *Kick-All abgeschlossen*\n\n✅ Erfolgreich entfernt: ${kicked.length}\n❌ Fehlerhaft: ${failed.length}`;
  if (failed.length) message += `\n\nFehlgeschlagen bei:\n${failed.map(j => '• @' + j.split('@')[0]).join('\n')}`;

  m.reply(message, null, {
    mentions: failed
  });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
