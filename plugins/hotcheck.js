let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;
  
  // Fun hotness messages
  const hotnessMessages = [
    `${target} ist so heiß, dass man sich fast verbrennen könnte! 🔥💥`,
    `${target} hat das heißeste Aussehen, das die Welt je gesehen hat! 😎🔥`,
    `${target} könnte als heiße Lava durchgehen! 🏖️🔥💯`,
    `${target} ist heißer als der Sonnenschein an einem Sommernachmittag! 🌞🔥`,
    `${target} hat einen heißeren Look als jeder heiße Grill im Sommer! 🍔🔥💃`,
    `${target} ist der Grund, warum Feuerlöscher erfunden wurden! 🔥🔥🔥`,
    `${target} könnte das Wetter in der Stadt heißer machen! 🌡️🔥`,
    `${target} ist die wahre Definition von 'Heiß'! 🔥❤️‍🔥`,
    `${target} könnte den Vulkan in Pompeji neu entfachen! 🌋🔥`,
    `${target} strahlt mehr Hitze aus als der Vulkan auf Island! 🌋🔥💥`,
    `${target} könnte als heiße Schokolade durchgehen, die man nie zu heiß trinken kann! 🍫🔥`,
    `${target} ist heißer als der Mittelpunkt der Sonne! 🌞🔥💣`,
    `${target} ist wie der heißeste Trend der Saison – niemand kann den Blick abwenden! 😍🔥`,
    `${target} sieht so aus, als würde sogar der Raum zu heiß werden, wenn er den Raum betritt! 🔥🚶‍♂️💥`,
    `${target} hat so viel Hitze, dass der Bildschirm deines Handys jetzt glüht! 📱🔥`,
    `${target} ist so heiß, selbst der Kühlschrank kann nicht gegen die Hitze ankommen! ❄️🔥`,
    `${target} könnte die Atmosphäre zum Kochen bringen! 🌍🔥`,
    `${target} hat das Feuer des Drachen in sich! 🐉🔥`,
    `${target} strahlt so viel Hitze aus, dass der Polarstern im Vergleich schwach aussieht! 🌠🔥`,
    `${target} könnte als heiße Sauce in einem 5-Sterne-Restaurant durchgehen! 🌶️🔥`,
  ];

  // Generate random hotness message
  const randomMessage = hotnessMessages[Math.floor(Math.random() * hotnessMessages.length)];

  // Send the hotness message
  await m.reply(randomMessage);
};

handler.command = ['hotcheck', 'hot', 'heiß'];
handler.help = ['hotcheck [@user]'];
handler.tags = ['fun'];

module.exports = handler;