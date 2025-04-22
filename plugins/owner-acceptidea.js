let handler = async (m, { conn, text }) => {
  if (!text) throw '❗ Bitte gib die Nutzer-ID an.';

  await conn.sendMessage(text.trim(), {
    text: `✅ *Gute Neuigkeiten!*  
Deine Idee wurde *angenommen*. Danke für deinen Beitrag zur Community!`,
  });

  await m.reply('✅ Die Idee wurde als *angenommen* markiert.');
};

handler.command = ['acceptidea'];
handler.help = ['acceptidea <jid>'];
handler.tags = ['community'];
handler.rowner = true;

module.exports = handler;
