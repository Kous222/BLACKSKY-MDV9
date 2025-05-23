let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw '❗ Bitte gib einen gültigen Gruppenlink an.\n\nBeispiel:\n.join https://chat.whatsapp.com/AbCdEfGhIjK';
  }

  if (!/chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/i.test(text)) {
    throw '❌ Das sieht nicht nach einem gültigen WhatsApp-Gruppenlink aus.';
  }

  const sender = m.sender;
  const trimmedLink = text.trim();

  const alreadyRequested = joinRequests.some(req => req.link === trimmedLink && req.sender === sender);
  if (alreadyRequested) {
    return m.reply('⚠️ Du hast diese Anfrage bereits gestellt. Bitte warte auf die Entscheidung des Teams.');
  }

  // Anfrage speichern
  joinRequests.push({
    sender,
    link: trimmedLink
  });

  await m.reply('✅ Deine Beitrittsanfrage wurde gespeichert und an das Support-Team gesendet. Bitte habe etwas Geduld.');

  // ---- Anfrage an Supportgruppe weiterleiten ----
  const supportGroupId = '120363399996195320@g.us'; // Deine echte Support-Gruppen-ID
  const requestText =
    `📩 *Neue Beitrittsanfrage:*\n\n` +
    `👤 Von: @${sender.split('@')[0]}\n` +
    `🔗 Link: ${trimmedLink}\n\n` +
    `📋 Verwalte Anfragen mit:\n.joinrequests`;

  await conn.sendMessage(supportGroupId, {
    text: requestText,
    mentions: [sender]
  });
};

handler.help = ['join <gruppenlink>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.private = false;

module.exports = handler;
