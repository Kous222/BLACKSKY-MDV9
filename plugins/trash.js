let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : '';
  const sender = `@${m.sender.split('@')[0]}`;

  // Check if there's a target
  if (!target) {
    await m.reply('❌ *Bitte gib den Benutzernamen an, den du in den Müll werfen möchtest!*');
    return;
  }

  const trashMessages = [
    `${sender} wirft ${target} in den Müll! 🗑️💥`,
    `${sender} hat beschlossen, ${target} im Müll zu entsorgen! 🗑️🙃`,
    `${sender} packt ${target} in den Mülleimer! 🗑️🔥`,
    `${sender} hat den ultimativen Müllkampf gestartet und wirft ${target} in den Abfall! 🗑️💪`,
    `${sender} hat den Müllberg erreicht und schubst ${target} direkt rein! 🗑️😈`
  ];

  // Select a random trash message from the list
  const randomMessage = trashMessages[Math.floor(Math.random() * trashMessages.length)];

  // Send the trash message
  await m.reply(randomMessage);
};

handler.command = ['trash', 'wirfinmüll'];
handler.help = ['trash [@user]'];
handler.tags = ['fun'];

module.exports = handler;