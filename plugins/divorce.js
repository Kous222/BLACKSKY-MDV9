let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned, if not, fall back to quoted sender or message sender
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, von der du dich scheiden möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Crafting the divorce proposal message
  let message = `💔💔 *Scheidungsantrag für @${mentioned.split('@')[0]}* 💔💔\n\n` +
    `Liebe/r @${mentioned.split('@')[0]},\n\n` +
    'Mit all meiner Trauer und schweren Herzen frage ich dich, möchtest du dich von mir scheiden lassen? 😢💔\n\n' +
    'Bist du bereit, unser gemeinsames Leben zu beenden? 😞💔\n\n' +
    'Ich freue mich auf deine Antwort und hoffe, dass du "Ja, ich möchte mich scheiden lassen" oder "Nein" sagst! 💔\n\n' +
    '*Antworten Sie nur mit "Ja, ich möchte mich scheiden lassen" oder "Nein"*.';

  // Send the divorce proposal message and wait for response
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned], // Proper mention using the user's JID
  }, { quoted: m });

  // Listen for the response to the divorce proposal using the correct event handler
  conn.ev.on('messages.upsert', async (update) => {
    // Get the latest message
    const reply = update.messages[0];  
    
    // Ensure the response is from the mentioned user
    if (reply.sender === mentioned) {
      let replyMessage = '';

      // If the response is exactly "Ja, ich möchte mich scheiden lassen"
      if (/ja,? ich möchte mich scheiden lassen/i.test(reply.text)) {
        // More somber messages for divorce acceptance
        let successMessages = [
          `💔 *Es tut mir leid, @${mentioned.split('@')[0]}, aber du hast den Scheidungsantrag angenommen.* 💔\n\n` +
          'Unsere Wege trennen sich jetzt, aber ich wünsche dir für die Zukunft alles Gute! 😞💔',

          `😭 *Oh @${mentioned.split('@')[0]}, du hast zugestimmt, dich zu scheiden!* 😭\n\n` +
          'Es tut mir leid, aber wir müssen uns jetzt trennen. Ich wünsche dir trotzdem nur das Beste für die Zukunft! 💔',

          `💔 *@${mentioned.split('@')[0]} hat Ja gesagt!* 💔\n\n` +
          'Es war eine schwierige Entscheidung, aber nun ist es offiziell. Viel Glück für die Zukunft! 💫'
        ];
        // Randomly select one of the success messages
        replyMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
      }
      // If the response is exactly "Nein"
      else if (/nein/i.test(reply.text)) {
        // Reassuring rejection messages
        let rejectionMessages = [
          `💖 *Oh, @${mentioned.split('@')[0]}, du hast abgelehnt!* 💖\n\n` +
          'Ich bin erleichtert! Es gibt immer noch Hoffnung für uns! 🥰',

          `😍 *@${mentioned.split('@')[0]} hat Nein gesagt!* 😍\n\n` +
          'Das ist die Antwort, die ich mir gewünscht habe! Unser Leben geht weiter wie vorher! 💖',

          `💘 *Oh, @${mentioned.split('@')[0]} hat Nein gesagt!* 💘\n\n` +
          'Ich freue mich, dass wir weiter zusammen bleiben können! 💞'
        ];
        // Randomly select one of the rejection messages
        replyMessage = rejectionMessages[Math.floor(Math.random() * rejectionMessages.length)];
      }
      // If the response is neither "Ja" nor "Nein"
      else {
        return; // Ignore any other response
      }

      // Send the reply message based on the response
      await conn.sendMessage(m.chat, { 
        text: replyMessage, 
        mentions: [mentioned]  // Proper mention in the response message
      }, { quoted: reply });
    }
  });
};

handler.help = ['divorce [@user]'];
handler.tags = ['fun', 'interaction', 'romance'];
handler.command = /^divorce$/i;

module.exports = handler;
