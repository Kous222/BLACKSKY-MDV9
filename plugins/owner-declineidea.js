let handler = async (m, { conn, text }) => {
  if (!text) throw '❗ Bitte gib die Nutzer-ID an.';

  await conn.sendMessage(text.trim(), {
    text: `❌ *Danke für deine Idee*, aber sie wurde diesmal *abgelehnt*.  
Lass dich nicht entmutigen – wir freuen uns auf weitere Vorschläge!`,
  });

  await m.reply('❌ Die Idee wurde als *abgelehnt* markiert.');
};

handler.command = ['declineidea'];
handler.help = ['declineidea <jid>'];
handler.tags = ['community'];
handler.rowner = true;

module.exports = handler;
