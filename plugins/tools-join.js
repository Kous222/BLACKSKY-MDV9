let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text }) => {
  if (!text) throw '❗ Bitte gib einen gültigen Gruppenlink an.\n\nBeispiel:\n.join https://chat.whatsapp.com/AbCdEfGhIjK';

  if (!/chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/.test(text))
    throw '❌ Das sieht nicht nach einem gültigen WhatsApp-Gruppenlink aus.';

  // Dublettenprüfung
  const alreadyRequested = joinRequests.some(req => req.link === text && req.sender === m.sender);
  if (alreadyRequested) return m.reply('⚠️ Du hast diese Anfrage bereits gestellt. Bitte warte auf die Entscheidung des Teams.');

  joinRequests.push({
    sender: m.sender,
    link: text.trim()
  });

  await m.reply('✅ Deine Beitrittsanfrage wurde gespeichert und an das Support-Team gesendet. Bitte habe etwas Geduld.');

  // An Supportgruppe senden
  const supportGroupId = '120363399996195320@g.us';
  const requestText =
    `📩 *Neue Join-Anfrage:*\n\n` +
    `👤 Von: @${m.sender.split('@')[0]}\n` +
    `🔗 Link: ${text}\n\n` +
    `🔍 Überprüfe und verwalte sie mit:\n.joinrequests`;

  await conn.sendMessage(supportGroupId, {
    text: requestText,
    mentions: [m.sender]
  });
};

handler.help = ['join <gruppenlink>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.private = false;

module.exports = handler;
