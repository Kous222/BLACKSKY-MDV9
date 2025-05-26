
let handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && ['admin', 'superadmin'].includes(p.admin));
  const botAdmin = groupMetadata.participants.some(p => p.id === conn.user.jid && ['admin', 'superadmin'].includes(p.admin));

  if (!m.isGroup) return m.reply('🚫 *Dieser Befehl funktioniert nur in Gruppen!*');
  if (!isAdmin) return m.reply('❌ *Nur Gruppen-Admins können diese Funktion ausführen.*');
  if (!botAdmin) return m.reply('🤖 *Ich benötige Admin-Rechte, um die Gruppe stummzuschalten. Bitte gib mir Adminrechte.*');

  await conn.groupSettingUpdate(m.chat, 'announcement'); // Nur Admins können schreiben
  m.reply('🔇 *Die Gruppe wurde erfolgreich stummgeschaltet!*\nAb sofort können nur noch Admins Nachrichten senden.\n\n✅ Zum Aufheben verwende den Befehl *.unmute*.');
};

handler.help = ['mute'];
handler.tags = ['group'];
handler.command = /^mute$/i;
handler.group = true;

module.exports = handler;
