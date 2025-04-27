let handler = async (m, { conn, text, participants }) => {
  let target;

  if (m.mentionedJid.length > 0) {
    target = m.mentionedJid[0];
  } else if (text) {
    // Nummer aus dem Text extrahieren, falls nicht markiert
    let userInput = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (participants.some(p => p.id === userInput)) {
      target = userInput;
    }
  }

  if (!target) {
    return m.reply('Markiere jemanden, dem du den Schwanz lutschen möchtest! 😝');
  }

  let sender = m.sender;

  let message = `😝 @${sender.split('@')[0]} lutscht den Schwanz von @${target.split('@')[0]}!`;

  await conn.sendMessage(m.chat, { 
    text: message, 
    mentions: [sender, target] 
  }, { quoted: m });
};

handler.help = ['suckcock @user'];
handler.tags = ['fun'];
handler.command = /^suckcock$/i;

module.exports = handler;