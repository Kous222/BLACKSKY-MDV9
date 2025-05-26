let handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && ['admin', 'superadmin'].includes(p.admin));
  const botAdmin = groupMetadata.participants.some(p => p.id === conn.user.jid && ['admin', 'superadmin'].includes(p.admin));

  if (!m.isGroup) return m.reply('🚫 Sorry, das geht nur in Gruppen!');
  if (!isAdmin) return m.reply('⚠️ Nur Admins haben hier das Sagen – du nicht! 😜');
  if (!botAdmin) return m.reply('🤖 Ich brauch Admin-Power, sonst kann ich nichts reißen!');

  await conn.groupSettingUpdate(m.chat, 'not_announcement'); // Alle dürfen schreiben
  m.reply(`🎉 Boom! Die Fesseln sind gefallen – die Gruppe ist jetzt 🔓 *entsperrt*!\nJetzt kann jeder wieder loslegen und quatschen. Let’s go! 🚀`);
};

handler.help = ['unmute'];
handler.tags = ['group'];
handler.command = /^unmute$/i;
handler.group = true;

module.exports = handler;