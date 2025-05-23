let handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && ['admin', 'superadmin'].includes(p.admin));
  const botAdmin = groupMetadata.participants.some(p => p.id === conn.user.jid && ['admin', 'superadmin'].includes(p.admin));

  if (!m.isGroup) return m.reply('❌ *Dieser Befehl ist nur in Gruppen verfügbar.*');
  if (!isAdmin) return m.reply('❌ *Nur Gruppenadmins können diesen Befehl verwenden.*');
  if (!botAdmin) return m.reply('❌ *Ich bin kein Admin. Bitte mache mich zuerst zum Admin.*');

  await conn.groupSettingUpdate(m.chat, 'announcement'); // Nur Admins können schreiben
  m.reply('🔇 *Gruppe erfolgreich stummgeschaltet!*\nJetzt können nur noch Admins schreiben.');
};

handler.help = ['mute'];
handler.tags = ['group'];
handler.command = /^mute$/i;
handler.group = true;

module.exports = handler;
