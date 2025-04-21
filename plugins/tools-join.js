let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text }) => {
  if (!text) throw '❗ Bitte gib einen gültigen Gruppenlink an.\n\nBeispiel:\n.join https://chat.whatsapp.com/AbCdEfGhIjK';

  if (!text.includes('whatsapp.com/')) throw '❌ Das sieht nicht nach einem gültigen WhatsApp-Gruppenlink aus.';

  joinRequests.push({
    sender: m.sender,
    link: text.trim()
  });

  await m.reply('✅ Deine Beitrittsanfrage wurde gespeichert und an das Support-Team gesendet. Bitte habe etwas Geduld.');

  // An Supportgruppe senden
  let supportGroupId = '120363399996195320@g.us';
  await conn.sendMessage(supportGroupId, {
    text: `📩 *Neue Join-Anfrage eingegangen:*\n\n👤 Von: @${m.sender.split('@')[0]}\n🔗 Link: ${text}`,
    mentions: [m.sender]
  });
};

handler.help = ['join <gruppenlink>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.private = false;

module.exports = handler;
