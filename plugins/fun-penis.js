let handler = async (m, { text, args, participants }) => {
  // Ziel bestimmen (erwähnt, zitiert oder Absender)
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  // Penisgröße (5–25 cm)
  let size = Math.floor(Math.random() * 21) + 5;
  let penis = '8' + '='.repeat(size) + 'D';

  // Reaktion basierend auf der Länge
  let reaction = '';
  if (size <= 7) {
    reaction = '…äh, ist das überhaupt sichtbar?';
  } else if (size <= 12) {
    reaction = 'Solide Durchschnittsgröße. Respekt!';
  } else if (size <= 18) {
    reaction = 'Nicht schlecht, da wird jemand beneidet!';
  } else {
    reaction = 'Bruder… ist das überhaupt legal?!';
  }

  // Nachricht mit WhatsApp-Erwähnung
  let message = `*Penisgröße von @${target.split('@')[0]}*\n\n${penis}\n\n*${size} cm*\n${reaction}`;
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['penis [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^penis$/i;
handler.limit = false;
handler.register = true;

module.exports = handler;
