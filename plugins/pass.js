let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du den "Smash" verweigern möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // List of playful "pass" messages
  let passMessages = [
    `🚫 *@${mentioned.split('@')[0]}, du wurdest gerade von mir abgeblockt!* 🚫\n\n` +
    'Kein "Smash" für dich heute! Vielleicht ein anderes Mal... 😏💔',

    `💔 *@${mentioned.split('@')[0]}, ich muss leider passen!* 💔\n\n` +
    'Der Moment ist einfach nicht richtig für einen "Smash". Vielleicht später... 😅',

    `🚷 *@${mentioned.split('@')[0]}*, du hast heute Pech! Kein "Smash" für dich.* 🚷\n\n` +
    'Manchmal muss man einfach ablehnen. Vielleicht beim nächsten Mal! 😘💫',

    `🙅 *@${mentioned.split('@')[0]}, kein "Smash" heute!* 🙅\n\n` +
    'Du hast meine Liebe verpasst... vielleicht gibt es eine andere Chance! 😏💖',

    `💔 *@${mentioned.split('@')[0]}*, ich muss leider abweisen!* 💔\n\n` +
    'Kein "Smash" heute, aber bleib nicht traurig! Das Leben geht weiter! 😌💓',

    `🛑 *@${mentioned.split('@')[0]}, ich werde diesen "Smash" ablehnen!* 🛑\n\n` +
    'Heute ist einfach nicht dein Tag für die Liebe... bleib ruhig und vielleicht beim nächsten Mal! 😅💔',
    
    `❌ *@${mentioned.split('@')[0]}*, kein "Smash" von mir!* ❌\n\n` +
    'Es tut mir leid, aber nicht heute... vielleicht ein anderes Mal! 😘💔',
  ];

  // Randomly select one of the pass messages
  let passMessage = passMessages[Math.floor(Math.random() * passMessages.length)];

  // Send the pass message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: passMessage,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['pass [@user]'];
handler.tags = ['fun', 'interaction'];
handler.command = /^pass$/i;

module.exports = handler;
