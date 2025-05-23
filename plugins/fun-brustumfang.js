let handler = async (m, { text, args, participants }) => {
  let target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  let size = Math.floor(Math.random() * 100) + 30; // 30–130 cm

  let reaction = '';
  if (size <= 50) reaction = 'Flach wie ein Brett…';
  else if (size <= 80) reaction = 'Stabil, nicht zu viel, nicht zu wenig.';
  else if (size <= 100) reaction = 'Da hat jemand ordentlich Holz vor der Hütte!';
  else reaction = 'Halt deine Milchshakefabrik unter Kontrolle!';

  let message = `*Brustumfang von @${target.split('@')[0]}*\n\n*${size} cm*\n${reaction}`;
  conn.sendMessage(m.chat, { text: message, mentions: [target] }, { quoted: m });
};

handler.help = ['brust [@nutzer]'];
handler.tags = ['fun'];
handler.command = /^brust$/i;
module.exports = handler;
