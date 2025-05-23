let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, die du verwöhnen möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // List of intimate and playful smash messages
  let smashMessages = [
    `💋 *@${mentioned.split('@')[0]}, du bist jetzt mein persönliches "Smash"!* 💋\n\n` +
    'Ich hoffe, du hast keine Angst vor all der Liebe, die ich dir gerade gebe. 😏💖',

    `💞 *@${mentioned.split('@')[0]}, du bist jetzt mein Smash!* 💞\n\n` +
    'Ein bisschen Nähe, ein bisschen Liebe und ein ganzes Lächeln von mir! 😘💕',

    `💘 *@${mentioned.split('@')[0]}* du bist der perfekte Moment für mein "Smash" heute! 💘\n\n` +
    'Gibt es einen besseren Weg, den Tag zu verbringen, als mit einer dicken Portion Zuneigung? 😏💖',

    `💋 *@${mentioned.split('@')[0]}*, du bist jetzt offiziell mein "Smash"! 💋\n\n` +
    'Bereit für eine gemütliche Umarmung voller Liebe und Kuscheln? 😘💞',

    `💖 *@${mentioned.split('@')[0]}* ist mein "Smash" für heute! 💖\n\n` +
    'Komm, lass dich von mir verwöhnen, du verdienst es! 😘💖',

    `💖 *@${mentioned.split('@')[0]}*, du bist der Grund, warum mein Herz schneller schlägt! 💖\n\n` +
    'Komm und lass dich von mir einhüllen in Liebe und Zärtlichkeit! 😘💫',

    `🔥 *@${mentioned.split('@')[0]}* ist jetzt mein heißes "Smash"! 🔥\n\n` +
    'Ich hoffe, du bist bereit für all die Liebe und Hitze, die ich dir gerade gebe! 😏💖',

    `✨ *@${mentioned.split('@')[0]}*, mein Herz schlägt nur für dich! ✨\n\n` +
    'Du bist der Funken, der alles erleuchtet! Komm und lass uns in Liebe schwelgen. 💖🔥',

    `💓 *@${mentioned.split('@')[0]}*, du bist mein "Smash" der Stunde! 💓\n\n` +
    'Nichts ist süßer, als dir diese Zuneigung zu schenken! 😘💖',

    `💌 *@${mentioned.split('@')[0]}, du bist mein ganz persönlicher Smash!* 💌\n\n` +
    'Ich hoffe, du bist bereit für all diese kuscheligen Momente und Küsse! 😘💋'
  ];

  // Randomly select one of the intimate smash messages
  let smashMessage = smashMessages[Math.floor(Math.random() * smashMessages.length)];

  // Send the intimate smash message to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: smashMessage,
    mentions: [mentioned]  // This will mention the user like WhatsApp does
  }, { quoted: m });
};

handler.help = ['smash [@user]'];
handler.tags = ['fun', 'intimate'];
handler.command = /^smash$/i;

module.exports = handler;
