let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;
  
  const compliments = [
    `Dein Lächeln ist so süß, dass sogar die Sonne neidisch wird! 🌞`,
    `Du hast das beste Lächeln der ganzen Welt! 🌸`,
    `Du bist wie ein Regenbogen an einem grauen Tag. 🌈`,
    `Du bist so charmant, du würdest selbst einen Felsen zum Lächeln bringen! 😊`,
    `Dein Stil ist so einzigartig, dass die Modewelt neidisch wird. 👗✨`,
    `Mit deinem Lächeln könntest du die Welt erobern! 😍`,
    `Hast du eine Geheimzutat, die dich so bezaubernd macht? 🍯✨`,
    `Du bist wie ein Sonnenschein an einem trüben Tag. ☀️`,
    `Deine Augen funkeln heller als jeder Stern am Himmel! ✨`,
    `Du bist der Grund, warum der Tag heute so besonders ist! 🌼`,
    `Du bist wie ein Magnet für positive Energie! 💖`,
    `Deine gute Laune ist einfach ansteckend! 😁`,
    `Mit dir wird jeder Moment zu etwas Besonderem! 🌟`,
    `Dein Humor ist einfach unschlagbar, du bringst alle zum Lachen! 😂`,
    `Du hast die wunderbare Fähigkeit, jedem Raum zu erleuchten! 💫`,
    `Du bist wie ein erfrischender Sommerwind – eine wahre Erholung! 🍃`,
    `Dein Lächeln ist wie ein Licht in der Dunkelheit! 💡`
  ];

  // Select a random compliment from the list
  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

  // Send the compliment
  await m.reply(`${randomCompliment} ${target ? `\n\nZielgerichtet an: ${target}` : ''}`);

  // Optional: Add a cute design or emoji decoration
  const cuteDecoration = `
    🐾🐱🐾🐱🐾🐱🐾🐱
    🐱🐾🐱🐾🐱🐾🐱🐾
    🐾🐱🐾🐱🐾🐱🐾🐱
  `;
  await m.reply(cuteDecoration);
};

handler.command = ['cute', 'compliment', 'adorable'];
handler.help = ['cute [@user]'];
handler.tags = ['fun'];

module.exports = handler;