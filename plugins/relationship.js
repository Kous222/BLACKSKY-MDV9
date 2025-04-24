let handler = async (m, { conn, text, participants }) => {
  // Select a random participant from the group
  let randomParticipant = participants[Math.floor(Math.random() * participants.length)].jid;

  // Get the name of the selected random participant
  let name = await conn.getName(randomParticipant);

  // Construct the relationship proposal message
  let message = `💖 *Hey @${randomParticipant.split('@')[0]}*, ich habe eine Frage für dich! 💖\n\n` +
    `Möchtest du mit mir in eine Beziehung gehen? 😍💌\n\n` +
    'Ich bin total neugierig auf deine Antwort, also sei ehrlich! 😏\n\n' +
    '*Antwort mit "Ja" oder "Nein"*';

  // Send the message to the group, tagging the random user
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [randomParticipant]  // Mention the user randomly selected
  }, { quoted: m });

  // Listen for the response from the tagged user
  conn.ev.on('messages.upsert', async (update) => {
    const reply = update.messages[0];  
    
    // Ensure the response is from the mentioned user
    if (reply.sender === randomParticipant) {
      let replyMessage = '';

      // If the response is exactly "Ja"
      if (/ja/i.test(reply.text)) {
        replyMessage = `🎉 *Glückwunsch, @${randomParticipant.split('@')[0]}! Du hast die Beziehung angenommen!* 🎉\n\n` +
          'Ich freue mich riesig, dass du Ja gesagt hast! 🥳💖';

      }
      // If the response is exactly "Nein"
      else if (/nein/i.test(reply.text)) {
        replyMessage = `😢 *Oh nein, @${randomParticipant.split('@')[0]} hat die Beziehung abgelehnt.* 😢\n\n` +
          'Es tut mir leid, aber ich werde dich trotzdem respektieren und bewundern! 💖';

      }

      // If the response is neither "Ja" nor "Nein"
      else {
        return; // Ignore any other response
      }

      // Send the reply message based on the response
      await conn.sendMessage(m.chat, { 
        text: replyMessage, 
        mentions: [randomParticipant]  // Proper mention in the response message
      }, { quoted: reply });
    }
  });
};

handler.help = ['relationship'];
handler.tags = ['fun', 'interaction', 'romance'];
handler.command = /^relationship$/i;

module.exports = handler;
