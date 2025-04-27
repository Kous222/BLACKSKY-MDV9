let handler = async (m, { conn, text }) => {
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du einen Heiratsantrag machen möchtest!');
  }

  let name = await conn.getName(mentioned);

  let message = `💍💖 *Heiratsantrag für @${mentioned.split('@')[0]}* 💖💍\n\n` +
    `Liebe/r @${mentioned.split('@')[0]},\n\n` +
    'Mit all meiner Liebe und meinem Herzen frage ich dich, möchtest du den Rest deines Lebens mit mir verbringen? 😍💍\n\n' +
    'Bist du bereit, meine Hand zu nehmen und mit mir die Reise der Liebe zu beginnen? 💑\n\n' +
    'Ich freue mich auf deine Antwort und hoffe, dass du "Ja, ich will" oder "Nein" sagst! 🤞💖\n\n' +
    '*Antworten Sie nur mit "Ja, ich will" oder "Nein"*.';

  // Send the proposal message and wait for response
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned], // Proper mention using the user's JID
  }, { quoted: m });

  // Listen for the response to the proposal using the correct event handler
  const listener = async (update) => {
    const reply = update.messages[0];

    if (reply.sender === mentioned) {
      let replyMessage = '';

      if (/ja,? ich will/i.test(reply.text)) {
        let successMessages = [
          `🎉 *Glückwunsch, @${mentioned.split('@')[0]}! Du hast den Heiratsantrag angenommen!* 🎉\n\n` +
          'Wir sind nun offiziell verlobt! 🥳💍 Ich freue mich auf unser gemeinsames Leben! 💖',

          `✨ *Wooooow, @${mentioned.split('@')[0]}! Du hast zugestimmt!* ✨\n\n` +
          'Ich kann mein Glück kaum fassen! Auf ein Leben voller Liebe und Abenteuer! 💑💍',

          `💍 *@${mentioned.split('@')[0]}, du hast Ja gesagt!* 💍\n\n` +
          'Ich kann es kaum erwarten, den Rest meines Lebens mit dir zu verbringen! 😘💖'
        ];
        replyMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
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

      // Send the reply message based on the response
      await conn.sendMessage(m.chat, {
        text: replyMessage,
        mentions: [mentioned], // Proper mention in the response message
      }, { quoted: reply });

      // Remove the listener after receiving the response
      conn.ev.off('messages.upsert', listener);
    }
  };

  // Subscribe to the response listener
  conn.ev.on('messages.upsert', listener);

  // Timeout: After 1 minute, automatically send the "Zeit abgelaufen" message
  setTimeout(() => {
    conn.ev.off('messages.upsert', listener); // Remove listener after timeout
    conn.sendMessage(m.chat, { text: '⌛ *Zeit abgelaufen! Keine Antwort erhalten.*' });
  }, 60000);
};

handler.help = ['marry [@user]'];
handler.tags = ['fun', 'interaction', 'romance'];
handler.command = /^marry$/i;

module.exports = handler;ntions: [mentioned]  // Proper mention in the response message
      }, { quoted: reply });
    }
  });
};

handler.help = ['marry [@user]'];
handler.tags = ['fun', 'interaction', 'romance'];
handler.command = /^marry$/i;

module.exports = handler;
