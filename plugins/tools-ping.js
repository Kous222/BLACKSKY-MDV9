let handler = async (m, { client }) => {
  const start = Date.now();  // Startzeit der Anfrage

  // Antwortzeit messen
  await m.reply("*🏓 Pong!*");

  const end = Date.now();  // Endzeit der Antwort
  const latency = end - start;  // Berechnung der Latenz

  await m.reply(
    `*🏓 Pong!*\n\n` +
    `🚀 *Reaktionszeit:* \`${latency}ms\`\n` +
    `💡 *Status:* ✅ Online & bereit`
  );
};

handler.help = ["ping"];
handler.tags = ["info"];
handler.command = /^ping$/i;
handler.register = true;

module.exports = handler;
