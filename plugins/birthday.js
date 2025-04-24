let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';
  
  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne den Benutzer, der Geburtstag hat!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Construct an array of birthday messages to choose from
  let birthdayMessages = [
    `🎉🎂 *Herzlichen Glückwunsch zum Geburtstag, @${mentioned.split('@')[0]}!* 🎂🎉\n\n` +
    'Möge dein Tag genauso großartig und strahlend sein wie du es bist! 🥳\n\n' +
    'Wünsche dir ein Jahr voller Glück, Erfolg und unvergesslicher Momente! 🎁✨\n\n' +
    'Genieße deinen besonderen Tag in vollen Zügen! 🌟\n\n' +
    'Alles Gute und viel Liebe von uns allen! 💖',

    `🎈🎉 *Alles Gute zum Geburtstag, @${mentioned.split('@')[0]}!* 🎉🎈\n\n` +
    'Ich hoffe, dein Tag ist genauso wunderbar wie du! 😊 Möge das kommende Jahr voller Erfolg und Glück sein. 🎂🎁\n\n' +
    'Feier schön und genieße jede Sekunde! 🎉💖',

    `🌟🎂 *Happy Birthday, @${mentioned.split('@')[0]}!* 🎂🌟\n\n` +
    'Möge das neue Lebensjahr dir viele Abenteuer und unvergessliche Momente bringen! 🎉🥳\n\n' +
    'Lass uns diesen besonderen Tag gebührend feiern! 🎈🎉 Viel Glück und Liebe für dich! 💕',

    `💖🎉 *Herzlichen Glückwunsch zum Geburtstag, @${mentioned.split('@')[0]}!* 🎉💖\n\n` +
    'Ich wünsche dir einen fantastischen Tag und ein Jahr voller Liebe und Erfolg! 🌹💫\n\n' +
    'Möge das Leben dir nur die schönsten Dinge schenken! 🎁✨ Viel Spaß beim Feiern! 🥳',

    `🎂✨ *Alles Gute zum Geburtstag, @${mentioned.split('@')[0]}!* ✨🎂\n\n` +
    'Mögen all deine Wünsche in Erfüllung gehen und das neue Jahr dir nur Glück und Freude bringen! 🎉🎁\n\n' +
    'Feier ausgiebig und genieße deinen Tag in vollen Zügen! 🎈💖',

    `🎊🎉 *Herzlichen Glückwunsch zum Geburtstag, @${mentioned.split('@')[0]}!* 🎉🎊\n\n` +
    'Ich wünsche dir einen wundervollen Tag voller Lachen, Liebe und unvergesslicher Momente! 🥳🎂\n\n' +
    'Möge das neue Lebensjahr genauso außergewöhnlich sein wie du es bist! 💫🎁',

    `🥳🎂 *Happy Birthday, @${mentioned.split('@')[0]}!* 🎂🥳\n\n` +
    'Möge dein Tag genauso toll sein wie du es bist! 🎉✨ Ich wünsche dir ein Jahr voller neuer Erlebnisse und Abenteuer! 🌟\n\n' +
    'Feier schön und genieße deinen Tag in vollen Zügen! 💖🎁'
  ];

  // Randomly select a birthday message
  let message = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];

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
