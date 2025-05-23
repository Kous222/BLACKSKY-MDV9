let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du anflirten möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // List of flirtatious messages
  let flirtMessages = [
    `💘 *@${mentioned.split('@')[0]}, du bist jetzt mein Flirt!* 💘\n\n` +
    'Dein Lächeln ist einfach umwerfend, wie kannst du so charmant sein? 😏💖',

    `😍 *@${mentioned.split('@')[0]}, du hast gerade mein Herz erobert!* 😍\n\n` +
    'Es ist kaum zu fassen, wie gut du heute aussiehst. 😘✨',

    `💖 *@${mentioned.split('@')[0]}, ich muss einfach ein Kompliment machen!* 💖\n\n` +
    'Ich glaube, du hast gerade mein Herz gestohlen. Wie machst du das nur? 😘❤️',

    `😘 *@${mentioned.split('@')[0]}*, du bist heute einfach der Star des Tages!* 😘\n\n` +
    'Ich würde dich für deinen Charme und deine Ausstrahlung niemals genug bewundern können. 💖✨',

    `💋 *@${mentioned.split('@')[0]}*, du bist mein absoluter Traum!* 💋\n\n` +
    'Ich könnte stundenlang mit dir reden und immer noch nicht genug bekommen. 😘💘',

    `💌 *@${mentioned.split('@')[0]}*, dein Charme kennt keine Grenzen!* 💌\n\n` +
    'Ich hoffe, du kannst mir verzeihen, aber du bist einfach unwiderstehlich. 😍💖',

    `💎 *@${mentioned.split('@')[0]}* ist einfach der Inbegriff von Schönheit!* 💎\n\n` +
    'Du lässt alles andere verblassen, wenn du den Raum betrittst. 😏💘',

    `✨ *@${mentioned.split('@')[0]}*, du hast mich einfach sprachlos gemacht!* ✨\n\n` +
    'Wie machst du das nur, so umwerfend zu sein? 😘💖'
  ];

  // Randomly select one of the flirtatious messages
  let flirtMessage = flirtMessages[Math.floor(Math.random() * flirtMessages.length)];

  // Send the flirt message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: flirtMessage,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['flirt [@user]'];
handler.tags = ['fun', 'love'];
handler.command = /^flirt$/i;

module.exports = handler;
