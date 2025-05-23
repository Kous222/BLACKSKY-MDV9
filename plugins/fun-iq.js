let handler = async (m, { text, args, participants }) => {
  let target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  let iq = Math.floor(Math.random() * 100) + 50; // 50–150

  let reaction = '';
  if (iq <= 70) reaction = 'Versuch mal das Denken heute nicht zu vergessen.';
  else if (iq <= 100) reaction = 'Solider Durchschnitt. Stolz sein!';
  else if (iq <= 130) reaction = 'Klüger als du aussiehst!';
  else reaction = 'Hör auf, mit Einstein zu konkurrieren.';

  let message = `*IQ von @${target.split('@')[0]}*\n\n*${iq} Punkte*\n${reaction}`;
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['iq [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^iq$/i;
module.exports = handler;
