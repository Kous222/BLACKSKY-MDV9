let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;

  // Creepy messages for the "die" plugin
  const creepyMessages = [
    `${target} wird von einer dunklen Präsenz verfolgt... Der Tod kommt! 💀👀`,
    `Das Schicksal hat entschieden. ${target} hat das Ende erblickt... 🌑🕯️`,
    `${target}, deine Zeit ist gekommen... Du bist dem Tod näher als je zuvor! ☠️🖤`,
    `${target} wird bald das unerklärliche Geheimnis des Todes entdecken... 😈👻`,
    `Der Tod wartet in den Schatten. ${target}, du kannst nicht entkommen... ⚰️🔪`,
    `Es gibt keinen Ausweg für ${target}... Der Tod ist unausweichlich! 👁️🖤`,
    `${target} hört die unheimlichen Schritte des Todes hinter sich... 🌙💀`,
    `Der letzte Atemzug von ${target} nähert sich schnell... ⏳💀`,
    `Komm, ${target}, der dunkle Vorhang fällt... 🕯️☠️`,
    `${target} fühlt die kalte Hand des Todes auf ihrer Schulter... ❄️💀`,
  ];

  // Select a random creepy message
  const randomMessage = creepyMessages[Math.floor(Math.random() * creepyMessages.length)];

  // Send the creepy message
  await m.reply(randomMessage);
};

handler.command = ['die', 'death', 'creep'];
handler.help = ['die [@user]'];
handler.tags = ['fun', 'creepy'];

module.exports = handler;