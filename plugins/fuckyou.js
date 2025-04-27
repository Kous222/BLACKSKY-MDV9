let handler = async (m, { text }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : '';
  const msg = [
    `Hmm... jemand hier hat wohl einen *Ehren-Mittelfinger* verdient.`,
    `Herzlichen Glückwunsch! Du wurdest offiziell mit einem 🖕🏽 ausgezeichnet.`,
    `Weil Worte manchmal nicht reichen: 🖕🏽`,
    `Persönlich überreicht vom Bot-Team: 🖕🏽`,
    `Bots können keine Gefühle zeigen... außer diesen hier: 🖕🏽`,
  ];
  
  await m.reply(`${msg[Math.floor(Math.random() * msg.length)]}${target ? `\n\n${target}` : ''}`);
};

handler.command = ['fuckyou'];
handler.help = ['fuckyou [@Nummer]'];
handler.tags = ['fun'];

module.exports = handler;