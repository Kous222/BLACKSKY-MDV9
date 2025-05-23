let handler = async (m, { conn, text, participants }) => {
  let target;

  if (m.mentionedJid.length > 0) {
    target = m.mentionedJid[0];
  } else if (text) {
    // Versuch, Nummer aus Text zu extrahieren
    let userInput = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (participants.some(p => p.id === userInput)) {
      target = userInput;
    }
  }

  if (!target) {
    return m.reply('Markiere die Person, der du eine Ananas reinstecken möchtest! 🍍🍑');
  }

  let sender = m.sender;

  let message = `🍍 @${sender.split('@')[0]} steckt @${target.split('@')[0]} eine Ananas tief in den Arsch! 🍑`;

  await conn.sendMessage(m.chat, { 
    text: message, 
    mentions: [sender, target] 
  }, { quoted: m });
};

handler.help = ['ananasarsch @user'];
handler.tags = ['fun'];
handler.command = /^ananasarsch$/i;

module.exports = handler;