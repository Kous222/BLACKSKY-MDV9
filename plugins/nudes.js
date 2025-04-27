let handler = async (m, { text, conn }) => {
  // Check if a target user is provided
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : null;

  if (!target) {
    return m.reply('❗ Bitte gib einen Benutzer an, den du nach nudes fragen möchtest. Beispiel: `.nudes @Benutzer`');
  }

  // Send a message asking the target user for a picture
  await m.reply(`@${m.sender.split('@')[0]} fragt ${target} nach nudes💦`);
};

handler.command = ['nudes'];
handler.help = ['nudes [@Benutzer]'];
handler.tags = ['fun'];

module.exports = handler;