let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, auf die du kacken möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Create the kackauf message
  let kackaufMessage = `💩 *@${mentioned.split('@')[0]}*, ich kacke jetzt auf dich! 💩\n\n` +
                       'Ich hoffe, du bist bereit für das unvergessliche Erlebnis! 😂';

  // Send the kackauf message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: kackaufMessage,
    mentions: [mentioned] // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['kack [@user]'];
handler.tags = ['fun'];
handler.command = /^kack$/i;

module.exports = handler;