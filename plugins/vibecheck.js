let handler = async (m, { conn, participants }) => {
  let target = m.mentionedJid && m.mentionedJid.length
    ? m.mentionedJid[0]
    : participants[Math.floor(Math.random() * participants.length)].id;

  let vibes = [
    'hat heute mega gute Vibes! ✨',
    'strahlt Chaos-Vibes aus... Vorsicht! ⚠️',
    'verbreitet richtig gemütliche Chill-Vibes. ☕',
    'ist heute auf Aggro-Vibes. Pass lieber auf. 🔥',
    'fühlt sich wie ein echter Main Character. 🎬',
    'verliert sich in traurigen Vibes... Umarmung nötig! 💔',
    'hat den Vibe eines TikTok-Stars heute! 🎶',
    'schwebt auf Wolke 7. Was ist das Geheimnis? ☁️',
    'sieht aus, als hätte jemand zu viel Kaffee gehabt. ☕⚡'
  ];

  let vibe = vibes[Math.floor(Math.random() * vibes.length)];

  let text = `🔮 *Vibe Check* 🔮\n\n@${target.split('@')[0]} ${vibe}`;

  await conn.sendMessage(m.chat, {
    text,
    mentions: [target]
  }, { quoted: m });
};

handler.help = ['vibecheck [@user]'];
handler.tags = ['fun'];
handler.command = /^vibecheck$/i;

module.exports = handler;
