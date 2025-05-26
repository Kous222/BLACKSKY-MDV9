const fs = require('fs');

let handler = async (m, { conn }) => {
  const mentioned = m.mentionedJid && m.mentionedJid[0];
  if (!mentioned) return m.reply('❗ *Bitte erwähne die Person, der du einen Heiratsantrag machen möchtest!*');

  const nameMentioned = await conn.getName(mentioned);
  const nameSender = await conn.getName(m.sender);

  // Proposal message with mentions and instructions
  const proposalText =
    `💍💖 *Heiratsantrag für @${mentioned.split('@')[0]}* 💖💍\n\n` +
    `*Liebe/r @${mentioned.split('@')[0]},*\n\n` +
    'Möchtest du den Rest deines Lebens mit mir verbringen?\n\n' +
    'Bitte antworte genau mit *"Ja, ich will"* oder *"Nein"*.';

  // Send the proposal message with image and mentions
  await conn.sendMessage(m.chat, {
    image: fs.readFileSync('./gifs/marry.png'),
    caption: proposalText,
    footer: 'Bitte antworte innerhalb von 1 Minute.',
    mentions: [mentioned],
  }, { quoted: m });

  // Flag to stop listening after answer or timeout
  let answered = false;

  // Listener for normal text replies from the mentioned user only
  const listener = async (updates) => {
    if (!updates.messages || updates.messages.length === 0) return;
    const msg = updates.messages[0];

    if (msg.key.fromMe) return; // ignore own messages

    const sender = msg.key.participant || msg.key.remoteJid;
    if (sender !== mentioned) return; // only react to mentioned user replies

    if (!msg.message?.conversation && !msg.message?.extendedTextMessage) return; // no text message

    // Extract text from message
    const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim().toLowerCase();

    if (answered) return; // already answered

    if (text === 'ja, ich will' || text === 'ja ich will') {
      answered = true;

      // Accepted reply messages
      const replyText =
        `🎉 Herzlichen Glückwunsch, @${mentioned.split('@')[0]}! Du hast den Heiratsantrag angenommen! 💍\n` +
        `Wir sind jetzt verlobt! 🥳💖`;

      const certificateText =
        `🎓 *Hochzeitsurkunde* 🎓\n\n` +
        `💑 *Ehepaar:* @${mentioned.split('@')[0]} & @${m.sender.split('@')[0]}\n` +
        `📅 *Datum der Eheschließung:* ${new Date().toLocaleDateString('de-DE')}\n\n` +
        `Herzlichen Glückwunsch zur Verlobung!`;

      await conn.sendMessage(m.chat, {
        text: replyText,
        mentions: [mentioned],
      }, { quoted: msg });

      await conn.sendMessage(m.chat, {
        image: fs.readFileSync('./gifs/marry.png'),
        caption: certificateText,
        mentions: [mentioned, m.sender],
      }, { quoted: msg });

      conn.ev.off('messages.upsert', listener);
    } else if (text === 'nein') {
      answered = true;

      // Rejected reply messages
      const replyText =
        `😢 @${mentioned.split('@')[0]}, du hast den Heiratsantrag abgelehnt.\n` +
        'Vielleicht ein anderes Mal...';

      await conn.sendMessage(m.chat, {
        text: replyText,
        mentions: [mentioned],
      }, { quoted: msg });

      conn.ev.off('messages.upsert', listener);
    }
  };

  conn.ev.on('messages.upsert', listener);

  // Timeout after 60 seconds, stop listening
  setTimeout(() => {
    if (!answered) {
      conn.ev.off('messages.upsert', listener);
      conn.sendMessage(m.chat, { text: '⌛ *Zeit abgelaufen! Keine Antwort erhalten.*' }, { quoted: m });
    }
  }, 60000);
};

handler.help = ['marry [@user]'];
handler.tags = ['fun', 'interaction', 'romance'];
handler.command = /^marry$/i;

module.exports = handler;
