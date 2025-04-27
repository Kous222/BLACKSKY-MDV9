let handler = async (m, { text, conn }) => {
  const targetId = text ? text.replace(/[^0-9]/g, '') : '';
  const target = targetId ? `@${targetId}` : '';
  const sender = `@${m.sender.split('@')[0]}`;

  if (!targetId) {
    await m.reply('✨ *Bitte gib die Nummer oder @user an, dem du einen Spitznamen geben möchtest!*');
    return;
  }

  const spitznamen = [
    "Schnucki",
    "Kuschelmonster",
    "Zuckerpuppe",
    "Lieblingsmensch",
    "Knuddelbär",
    "Herzchen",
    "Sonnenschein",
    "Süßi",
    "Tigerchen",
    "Knutschkugel",
    "Engelchen",
    "Kuschelmaus",
    "Herzensbrecher",
    "Schatzilein",
    "Lieblingsstern",
    "Bärchen",
    "Süßes Schmusekätzchen",
    "Liebesbienchen",
    "Wolkenhimmel",
    "Traumprinzessin"
  ];

  const chosenName = spitznamen[Math.floor(Math.random() * spitznamen.length)];
  const message = `${sender} nennt ${target} ab sofort liebevoll „*${chosenName}*“! 💖`;

  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, `${targetId}@s.whatsapp.net`]
  }, { quoted: m });
};

handler.command = ['spitzname'];
handler.help = ['spitzname [@user]'];
handler.tags = ['fun'];

module.exports = handler;