/**
 * Owner Self-Promote Command
 * Allows the bot owner to promote themselves to admin in a group
 * Command: !selbstadmin or !selfadmin
 */
let handler = async (m, { conn, isAdmin, isOwner }) => {
  // Check if this is a group chat
  if (!m.isGroup) {
    return m.reply('Dieser Befehl kann nur in Gruppen verwendet werden.');
  }
  
  // Check if sender is already an admin
  if (isAdmin) {
    return m.reply('Du bist bereits ein Administrator in dieser Gruppe.');
  }
  
  // Check if the bot is an admin
  const bot = await conn.groupMetadata(m.chat);
  const botId = conn.user.jid.split('@')[0];
  const botParticipant = bot.participants.find(p => p.id.split('@')[0] === botId);
  
  if (!botParticipant.admin) {
    return m.reply('Ich bin kein Administrator in dieser Gruppe und kann dich daher nicht befördern.');
  }
  
  try {
    // Check if the sender is a bot owner
    const isRealOwner = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    
    if (!isRealOwner) {
      return m.reply('Dieser Befehl kann nur vom Bot-Besitzer verwendet werden.');
    }
    
    // Promote the sender to admin
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    m.reply('✅ Du wurdest erfolgreich zum Gruppenadministrator befördert!');
  } catch (error) {
    console.error('Fehler beim Befördern:', error);
    m.reply(`❌ Fehler beim Befördern: ${error.message}`);
  }
};

handler.help = ['selbstadmin', 'selfadmin'];
handler.tags = ['owner'];
handler.command = /^(selbstadmin|selfadmin)$/i;

// Only the owner can use this command
handler.owner = true;

// The bot must be an admin for this to work
handler.botAdmin = true;

module.exports = handler;
