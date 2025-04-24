let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';
  
  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne den Benutzer, der Geburtstag hat!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Construct the birthday message
  let message = `🎉🎂 *Herzlichen Glückwunsch zum Geburtstag, @${name}! 🎂🎉\n\n` +
    'Möge dein Tag genauso großartig und strahlend sein wie du es bist! 🥳\n\n' +
    'Wünsche dir ein Jahr voller Glück, Erfolg und unvergesslicher Momente! 🎁✨\n\n' +
    'Genieße deinen besonderen Tag in vollen Zügen! 🌟\n\n' +
    'Alles Gute und viel Liebe von uns allen! 💖\n';

  // Send the message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['birthday [@user]'];
handler.tags = ['fun'];
handler.command = /^birthday$/i;

module.exports = handler;
