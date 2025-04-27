let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : '';
  const sender = `@${m.sender.split('@')[0]}`;

  // Check if there's a target
  if (!target) {
    await m.reply('❌ *Bitte gib den Benutzernamen an, dem du deine Liebe gestehen möchtest!*');
    return;
  }

  const loveMessages = [
    `${sender} liebt ${target} bis zum Mond und zurück! 🌙❤️`,
    `${sender} hat eine Nachricht für ${target}: *Ich hab dich lieb!* 😘💖`,
    `${sender} gesteht ${target} seine Liebe! *Wirst du diese Liebe erwidern?* 💕`,
    `${sender} kann nicht aufhören, an ${target} zu denken. *Wirst du das Herz erobern?* 💘`,
    `${sender} und ${target}: Das süßeste Liebespaar der Welt! 💑💖`,
    `Die Sonne scheint für ${sender} und ${target} – zusammen seid ihr das perfekte Paar! 🌞💞`,
    `Die Sterne stehen günstig für ${sender} und ${target}. Euer Glück ist grenzenlos! 🌟💫`,
    `${sender} fühlt sich wie im siebten Himmel, weil er/sie ${target} gefunden hat! ☁️💖`,
    `${sender} hat eine Botschaft für ${target}: *Jede Minute mit dir ist ein Geschenk.* 🎁💘`,
    `${sender} und ${target}: Gemeinsam seid ihr ein unschlagbares Dreamteam! 🌟🤩`,
    `Jeder Blick auf ${target} macht das Herz von ${sender} schneller schlagen! 💓💓`,
    `${sender} und ${target}: Zwei Herzen, die in perfektem Einklang schlagen! 💖🎶`,
    `Du und ${target} seid wie zwei Puzzleteile, die perfekt zusammenpassen! 🧩❤️`,
    `Die Liebe zwischen ${sender} und ${target} wächst immer weiter! 🌱💚`,
    `Nichts kann die Liebe zwischen ${sender} und ${target} stoppen – sie ist unaufhaltbar! 💪💖`
  ];

  // Select a random love message from the list
  const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];

  // Send the love message
  await m.reply(randomMessage);
};

handler.command = ['love', 'iloveyou', 'heart'];
handler.help = ['love [@user]'];
handler.tags = ['fun'];

module.exports = handler;