const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) throw '❌ Dieser Befehl funktioniert nur in Gruppen.';

  let sender = m.sender;
  let senderTag = '@' + sender.split('@')[0];

  // Filtere alle außer Sender & Bot raus
  let others = participants
    .filter(p => p.id !== conn.user.jid && p.id !== sender)
    .map(p => p.id);

  if (others.length < 2) throw '❌ Nicht genug Teilnehmer für diese Aktivität. Mindestens 2 andere Teilnehmer benötigt.';

  // Zufällig 3 Teilnehmer auswählen
  let shuffled = others.sort(() => Math.random() - 0.5);
  let chosen = shuffled.slice(0, 3); // 3 Teilnehmer auswählen
  let mentions = [sender, ...chosen];

  let chosenTags = chosen.map(id => '@' + id.split('@')[0]).join(', ');

  let text = `*🔥 GangBang gestartet! 🔥*\n\n` +
             `🎉 *Achtung, ${senderTag} ist jetzt in einer spannenden Aktivität mit* ${chosenTags} *beteiligt!* 🎉\n\n` +
             `🔝 *Oben*: ${senderTag}\n` +
             `⏺️ *Mitte*: ${chosenTags.split(', ')[0]}\n` +
             `🔻 *Unten*: ${chosenTags.split(', ')[1]}\n\n` +
             `*Viel Spaß, Leute! Möge der Spaß beginnen!* 😄`;

  const gifPath = path.join(__dirname, '../gifs/gangbang.mp4'); // Path to video

  if (!fs.existsSync(gifPath)) return m.reply('Das Video für den GangBang wurde nicht gefunden.');

  await conn.sendMessage(m.chat, {
    video: fs.readFileSync(gifPath),
    gifPlayback: true,
    caption: text,
    mentions: mentions // Mentions the sender and chosen users
  }, { quoted: m });
};

handler.help = ['bang'];
handler.tags = ['fun'];
handler.command = ['bang'];
handler.group = true;
handler.rpg = false;

module.exports = handler;
