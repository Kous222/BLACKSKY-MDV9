let handler = async (m, { conn, text, participants }) => {
  let target;

  if (m.mentionedJid.length > 0) {
    target = m.mentionedJid[0];
  } else if (text) {
    // Versuche, Nummer aus Text zu extrahieren
    let userInput = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (participants.some(p => p.id === userInput)) {
      target = userInput;
    }
  }

  if (!target) {
    return m.reply('Markiere die Person, der du einen richtigen Kater wünschen möchtest! 🍻');
  }

  let sender = m.sender;

  let message = `🍻 @${sender.split('@')[0]} wünscht @${target.split('@')[0]} einen richtigen Kater! 🤕`;

  await conn.sendMessage(m.chat, { 
    text: message, 
    mentions: [sender, target] 
  }, { quoted: m });
};

handler.help = ['kater @user'];
handler.tags = ['fun'];
handler.command = /^kater$/i;

module.exports = handler;