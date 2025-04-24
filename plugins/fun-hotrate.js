let handler = async (m, { text, args, participants }) => {
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  let hot = Math.floor(Math.random() * 101);
  let reaction =
    hot > 90
      ? 'Hitzewarnung! Du bringst Thermometer zum Schmelzen.'
      : hot > 70
      ? 'Du bist heißer als ein Döner bei 3 Uhr nachts.'
      : hot > 40
      ? 'So lauwarm wie der Kaffee in der Büroküche.'
      : 'Eiskalt wie das Herz deines Ex.';

  let message = `*Heißigkeits-Check für @${target.split('@')[0]}*\n*${hot}% heiß*\n${reaction}`;
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['hotrate [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^hot(rate)?$/i;
module.exports = handler;
