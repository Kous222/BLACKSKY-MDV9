let handler = async (m, { text, args, participants }) => {
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender;

  let iq = Math.floor(Math.random() * 151); // 0–150 IQ
  let reaction = iq > 130
    ? 'Ein Genie unter uns!'
    : iq > 100
    ? 'Ziemlich clever.'
    : iq > 70
    ? 'Naja... sagen wir mal „besonders“'
    : 'Bitte nicht unbeaufsichtigt lassen.';

  let message = `*IQ von @${target.split('@')[0]}*: *${iq}*\n${reaction}`;
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['iqtest [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^iqtest$/i;
module.exports = handler;
