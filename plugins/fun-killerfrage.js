const killerFragen = [
  "Wenn du ein Sandwich wärst, welche Zutat wärst du – und warum?",
  "Was würdest du tun, wenn du plötzlich durchsichtig wärst?",
  "Welcher Song beschreibt dein Leben am besten?",
  "Wenn Tiere sprechen könnten – welches Tier wäre am unhöflichsten?",
  "Würdest du lieber Gedanken lesen oder durch Wände gehen können?",
  "Was ist das sinnloseste Talent, das du hast?",
  "Welche Verschwörungstheorie würdest du sofort glauben, ohne Beweise?",
  "Wenn du in einer Sitcom leben müsstest – welche wäre es?",
  "Was ist die schlimmste Ausrede, die du je benutzt hast?",
  "Du hast 1 Minute unsichtbar – was tust du?"
];

let handler = async (m, { conn, command }) => {
  const frage = killerFragen[Math.floor(Math.random() * killerFragen.length)];
  await conn.sendMessage(m.chat, {
    text: `☠️ *KILLERFRAGE* ☠️\n\n${frage}\n\nSchreibt eure Antworten – oder kneift!`,
  });
};

handler.command = ['killerfrage'];
handler.help = ['killerfrage'];
handler.tags = ['fun'];
handler.group = true;

module.exports = handler;