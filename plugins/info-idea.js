let handler = async (m, { conn, text }) => {
  const senderId = m.sender;
  const senderName = m.pushName || 'Unbekannt';
  const supportGroupId = '120363399996195320@g.us'; // Deine Support-Gruppe hier eintragen

  if (!text) throw '❗ Bitte gib deine Idee an.\n\nBeispiel:\n.idee Eine Funktion für Auto-Memes im Chat';

  await conn.sendMessage(supportGroupId, {
    text: `💡 *Neue Community-Idee!*

🧠 *Idee:* ${text}
👤 *Von:* @${senderId.split('@')[0]} (${senderName})

Was haltet ihr davon?`,
    mentions: [senderId],
    buttons: [
      { buttonId: `.acceptidea ${senderId}`, buttonText: { displayText: '✅ Annehmen' }, type: 1 },
      { buttonId: `.declineidea ${senderId}`, buttonText: { displayText: '❌ Ablehnen' }, type: 1 }
    ],
    footer: 'Community-Bot – Idee einreichen'
  });

  await conn.sendMessage(senderId, {
    text: `✨ *Danke, ${senderName}!*  
Deine Idee wurde an das Team weitergeleitet. Wir melden uns bald mit Feedback. Bleib kreativ!`,
  });
};

handler.command = ['idee'];
handler.help = ['idee <text>'];
handler.tags = ['community'];

module.exports = handler;
