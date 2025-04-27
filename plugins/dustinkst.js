let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : '';
  const sender = `@${m.sender.split('@')[0]}`;

  // Check if there's a target
  if (!target) {
    await m.reply('❌ *Bitte gib den Benutzernamen an, den du ansprechen möchtest!*');
    return;
  }

  // Funny messages with "sender sagt target stinkt" style
  const dustinkstMessages = [
    `${sender} sagt: *${target} stinkt nach ungebrauchtem Socken*! 🧦😜`,
    `${sender} sagt: *${target} hat den Duft eines zu lang gelagerten Käses!* 🧀🤭`,
    `${sender} sagt: *${target} riecht wie ein Gym-Bag nach einem 10-stündigen Workout!* 💪😅`,
    `${sender} sagt: *${target} hat den Geruch von frischen, noch nicht gewaschenen Handtüchern!* 🧺🦨`,
    `${sender} sagt: *${target} stinkt wie ein Fischmarkt nach einem langen Tag!* 🐟😆`,
    `${sender} sagt: *${target} riecht wie vergessene Pommes unter dem Bett!* 🍟🤢`,
    `${sender} sagt: *${target} hat den Duft eines alten Staubsaugers, der den ganzen Tag in der Sonne lag!* 🧹🌞`,
    `${sender} sagt: *${target} riecht wie der Rest von Popcorn in der Mikrowelle!* 🍿🔥`,
    `${sender} sagt: *${target} stinkt wie ein vergessener Mülleimer im heißen Sommer!* 🗑️☀️`,
    `${sender} sagt: *${target} duftet wie der ungelüftete Raum nach einer Party!* 🎉🚶‍♂️`,
    `${sender} sagt: *${target} riecht wie das unbenutzte Klopapier im Lager!* 🧻🦠`,
    `${sender} sagt: *${target} duftet wie der stinkende Sockenhaufen im Winter!* 🧦❄️`,
    `${sender} sagt: *${target} riecht wie die Reste eines alten Hot-Dogs!* 🌭😅`,
    `${sender} sagt: *${target} hat den Geruch eines nie gewaschenen Bademantels!* 🛁🤢`,
    `${sender} sagt: *${target} stinkt wie der Rand einer vergessenen Tüte Chips!* 🍪💨`,
    `${sender} sagt: *${target} riecht wie der Dampf aus einem offenen Kochtopf von gestern!* 🍲🤧`,
    `${sender} sagt: *${target} hat den Geruch von kaltem Magen-Darm-Saft!* 🤢🥴`,
    `${sender} sagt: *${target} riecht wie vergessene Schulsachen in der Sommerhitze!* 🎒☀️`,
    `${sender} sagt: *${target} duftet wie nasser Hund nach einem Regenstorm!* 🐕🌧️`,
    `${sender} sagt: *${target} riecht wie die Reste eines alten Fast-Food-Lunches!* 🍔💩`,
    `${sender} sagt: *${target} hat den Geruch von verschwundenem, verschimmeltem Käse!* 🧀🍂`,
    `${sender} sagt: *${target} stinkt wie das Ende einer langen, heißen Busfahrt!* 🚌😷`,
    `${sender} sagt: *${target} riecht wie der Schweiß aus einem vergessenen Turnschuh!* 👟🤢`,
  ];

  // Select a random dustinkst message from the list
  const randomMessage = dustinkstMessages[Math.floor(Math.random() * dustinkstMessages.length)];

  // Send the message
  await m.reply(randomMessage);
};

handler.command = ['dustinkst', 'funny', 'humor'];
handler.help = ['dustinkst [@user]'];
handler.tags = ['fun'];

module.exports = handler;