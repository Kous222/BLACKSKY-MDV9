let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';
  
  // If no user is mentioned, send an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne die Person, der du einen Heiratsantrag machen möchtest!');
  }

  // Get the name of the mentioned user
  let name = await conn.getName(mentioned);

  // Crafting the marriage proposal message
  let message = `💍💖 *Heiratsantrag für @${name}* 💖💍\n\n` +
    `Liebe/r @${name},\n\n` +
    'Mit all meiner Liebe und meinem Herzen frage ich dich, möchtest du den Rest deines Lebens mit mir verbringen? 😍💍\n\n' +
    'Bist du bereit, meine Hand zu nehmen und mit mir die Reise der Liebe zu beginnen? 💑\n\n' +
    'Ich freue mich auf deine Antwort und hoffe, dass du "Ja" sagst! 🤞💖\n\n' +
    '*Antworten Sie mit "Annehmen" oder "Ablehnen".*';

  // Send the proposal message and wait for response
  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [mentioned] // Mention the user in the message
  }, { quoted: m });

  // Listen for the response to the proposal
  conn.on('message', async (response) => {
    // Check if the message is from the mentioned user
    if (response.sender === mentioned && /annehmen|ablehnen/i.test(response.text)) {
      let replyMessage = '';

      // If the response is "Annehmen"
      if (/annehmen/i.test(response.text)) {
        replyMessage = `🎉 *Glückwunsch, @${name}! Sie haben den Heiratsantrag angenommen!* 🎉\n\n` +
          'Wir sind nun offiziell verlobt! 🥳💍 Ich freue mich auf unser gemeinsames Leben! 💖';
      }
      // If the response is "Ablehnen"
      else if (/ablehnen/i.test(response.text)) {
        replyMessage = `😢 *Oh nein, @${name}, du hast den Heiratsantrag abgelehnt.* 😢\n\n` +
          'Es tut mir leid, aber ich werde nie aufhören, dich zu lieben! ❤️';
      }

      // Send the reply message based on the response
      await conn.sendMessage(m.chat, { text: replyMessage, mentions: [mentioned] }, { quoted: response });
    }
  });
};

handler.help = ['marry [@user]'];
handler.tags = ['fun'];
handler.command = /^marry$/i;

module.exports = handler;

er;
