let handler = async (m, { text, args, participants, conn }) => {
  // Check if the user is mentioned, if not fall back to the quoted message sender or the message sender
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  // Generate a random hotness percentage
  let hot = Math.floor(Math.random() * 101);

  // Define the reaction based on the hotness percentage
  let reaction =
    hot > 90
      ? 'Hitzewarnung! Du bringst Thermometer zum Schmelzen.'
      : hot > 70
      ? 'Du bist heißer als ein Döner bei 3 Uhr nachts.'
      : hot > 40
      ? 'So lauwarm wie der Kaffee in der Büroküche.'
      : 'Eiskalt wie das Herz deines Ex.';

  // Get the name of the mentioned user (if available)
  let name = await conn.getName(target);

  // Craft the message with the name mentioned
  let message = `*Heißigkeits-Check für @${name}*\n*${hot}% heiß*\n${reaction}`;

  // Send the message with the mention to WhatsApp
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['hotrate [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^hot(rate)?$/i;

module.exports = handler;
