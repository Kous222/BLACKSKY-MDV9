let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kotzen möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Create the kotzauf message
  let kotzaufMessage = `🤢 *@${mentioned.split('@')[0]}*, ich kotze jetzt auf dich! 🤢\n\n` +
                       'Du hast es wirklich verdient, viel Spaß! 😂💩';

  // Send the kotzauf message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: kotzaufMessage,
    mentions: [mentioned] // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['kotze [@user]'];
handler.tags = ['fun'];
handler.command = /^kotze$/i;

module.exports = handler;