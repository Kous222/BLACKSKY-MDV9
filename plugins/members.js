let handler = async (m, { conn }) => {
  if (!m.isGroup) {
    m.reply('❗ Dieser Befehl kann nur in Gruppen verwendet werden.');
    return;
  }

  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participantCount = groupMetadata.participants.length;

    m.reply(`👥 Diese Gruppe hat aktuell *${participantCount}* Mitglieder.`);
  } catch (error) {
    console.error(error);
    m.reply('❗ Fehler beim Abrufen der Gruppendaten.');
  }
};

handler.command = ['groupmembers', 'members', 'mitglieder'];
handler.help = ['groupmembers', 'members', 'mitglieder'];
handler.tags = ['group'];
handler.group = true; 
handler.admin = false; 

module.exports = handler;
