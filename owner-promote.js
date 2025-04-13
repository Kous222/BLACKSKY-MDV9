/**
 * Owner Promote Command
 * Allows the bot owner to promote anyone in a group if the bot is admin
 * Command: !opromote @user
 */
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  // Check if this is a group chat
  if (!m.isGroup) {
    return m.reply('Dieser Befehl kann nur in Gruppen verwendet werden.');
  }
  
  // Check if the bot is an admin
  const bot = await conn.groupMetadata(m.chat);
  const botId = conn.user.jid.split('@')[0];
  const botParticipant = bot.participants.find(p => p.id.split('@')[0] === botId);
  
  if (!botParticipant.admin) {
    return m.reply('Ich bin kein Administrator in dieser Gruppe und kann daher niemanden befördern.');
  }
  
  // Check if a user is mentioned or provided
  let who;
  if (m.quoted) {
    who = m.quoted.sender;
  } else if (args[0]) {
    if (args[0].startsWith('@')) {
      who = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
      who = args[0];
      if (!who.includes('@')) {
        who = who + '@s.whatsapp.net';
      }
    }
  } else {
    return m.reply(`Wen möchtest du befördern? Tagge einen Benutzer oder antworte auf eine Nachricht.\nBeispiel: ${usedPrefix + command} @user`);
  }
  
  // Make sure the user is in the group
  const groupMembers = bot.participants.map(p => p.id);
  if (!groupMembers.includes(who)) {
    return m.reply('Dieser Benutzer ist nicht in der Gruppe.');
  }
  
  // Check if the target is already an admin
  const userParticipant = bot.participants.find(p => p.id === who);
  if (userParticipant && userParticipant.admin) {
    return m.reply('Dieser Benutzer ist bereits ein Administrator in dieser Gruppe.');
  }
  
  try {
    // Promote the user to admin
    await conn.groupParticipantsUpdate(m.chat, [who], "promote");
    m.reply(`✅ @${who.split('@')[0]} wurde erfolgreich zum Gruppenadministrator befördert!`, null, {
      mentions: [who]
    });
  } catch (error) {
    console.error('Fehler beim Befördern:', error);
    m.reply(`❌ Fehler beim Befördern: ${error.message}`);
  }
};

handler.help = ['opromote @user'];
handler.tags = ['owner'];
handler.command = /^(opromote|obefördern)$/i;

// Only the owner can use this command
handler.owner = true;

// The bot must be an admin for this to work
handler.botAdmin = true;

module.exports = handler;