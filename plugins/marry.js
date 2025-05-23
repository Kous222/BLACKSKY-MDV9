const fs = require('fs');

let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('❗ *Bitte erwähne die Person, der du einen Heiratsantrag machen möchtest!*');
  }

  let name = await conn.getName(mentioned);
  
  // Proposal message with styled formatting
  let message = `💍💖 *Heiratsantrag für @${mentioned.split('@')[0]}* 💖💍\n\n` +
    `*Liebe/r @${mentioned.split('@')[0]},*\n\n` +
    'Mit all meiner Liebe frage ich dich: *Möchtest du den Rest deines Lebens mit mir verbringen?* 😍💍\n\n' +
    'Bist du bereit, meine Hand zu nehmen und gemeinsam die Reise der Liebe zu beginnen? 💑\n\n' +
    'Ich freue mich sehr auf deine Antwort und hoffe, dass du mit "Ja, ich will" oder "Nein" antwortest! 🤞💖\n\n' +
    'Antworten nur mit: "Ja, ich will" oder "Nein".';

  // Send the proposal message with an image from the local folder
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned],
    image: fs.readFileSync('./gifs/marry.png'), // Path to the local image file
  }, { quoted: m });

  let timeoutReached = false;

  // Listen for the response
  const listener = async (update) => {
    const reply = update.messages[0];

    if (timeoutReached) return; // Ignore messages after timeout

    if (reply.sender === mentioned) {
      let replyMessage = '';

      if (/ja,? ich will/i.test(reply.text)) {
        let successMessages = [
          `🎉 *Herzlichen Glückwunsch, @${mentioned.split('@')[0]}! Du hast den Heiratsantrag angenommen!* 🎉\n\n` +
          'Wir sind nun offiziell verlobt! 🥳💍 Ich freue mich auf unser gemeinsames Leben! 💖',

          `✨ *Wow, @${mentioned.split('@')[0]}! Du hast zugestimmt!* ✨\n\n` +
          'Ich kann mein Glück kaum fassen! Auf ein Leben voller Liebe und Abenteuer! 💑💍',

          `💍 *@${mentioned.split('@')[0]}, du hast Ja gesagt!* 💍\n\n` +
          'Ich kann es kaum erwarten, den Rest meines Lebens mit dir zu verbringen! 😘💖'
        ];
        replyMessage = successMessages[Math.floor(Math.random() * successMessages.length)];

        // Create a marriage certificate message after "Yes"
        let certificateMessage = `🎓 *Hochzeitsurkunde* 🎓\n\n` +
          `*Verliebt in die Ehe:*\n\n` +
          `💑 *Ehepaar:* @${mentioned.split('@')[0]} & @${m.sender.split('@')[0]}\n` +
          `📅 *Datum der Eheschließung:* ${new Date().toLocaleDateString('de-DE')}\n` +
          `✍️ *Zeugen:* Alle, die Zeuge dieses wundervollen Moments sind! 💖\n\n` +
          '*Herzlichen Glückwunsch zur Hochzeit!* 🎉💍';

        // Send the marriage certificate with the local image
        await conn.sendMessage(m.chat, {
          text: certificateMessage,
          mentions: [mentioned, m.sender],
          image: fs.readFileSync('./gifs/marry.png'), // Path to the local image file
        }, { quoted: m });
        
      } else if (/nein/i.test(reply.text)) {
        let rejectionMessages = [
          `😢 *Oh nein, @${mentioned.split('@')[0]}, du hast den Heiratsantrag abgelehnt.* 😢\n\n` +
          'Es tut mir leid, aber ich werde nie aufhören, dich zu lieben! ❤️',

          `💔 *@${mentioned.split('@')[0]} hat Nein gesagt!* 💔\n\n` +
          'Kein Problem, meine Liebe bleibt für immer! Vielleicht ein anderes Mal... 😌',

          `🙁 *Oh schade, @${mentioned.split('@')[0]}, du hast abgelehnt.* 🙁\n\n` +
          'Ich werde trotzdem weiterhin ein treuer Bewunderer bleiben! 🥺💖'
        ];
        replyMessage = rejectionMessages[Math.floor(Math.random() * rejectionMessages.length)];
      } else {
        return; // Ignore other responses
      }

      // Send the reply message
      await conn.sendMessage(m.chat, {
        text: replyMessage,
        mentions: [mentioned], // Mention in the response
      }, { quoted: reply });

      // Remove the listener after receiving the response
      conn.ev.off('messages.upsert', listener);
    }
  };

  // Subscribe to the response listener
  conn.ev.on('messages.upsert', listener);

  // Timeout: After 1 minute, automatically send the "Zeit abgelaufen" message if no response is received
  setTimeout(() => {
    if (!timeoutReached) {
      timeoutReached = true;
      conn.ev.off('messages.upsert', listener); // Remove listener after timeout
      conn.sendMessage(m.chat, { text: '⌛ *Zeit abgelaufen! Keine Antwort erhalten.*' });
    }
  }, 60000); // Timeout after 60 seconds
};

handler.help = ['marry [@user]'];
handler.tags = ['fun', 'interaction', 'romance'];
handler.command = /^marry$/i;

module.exports = handler;
