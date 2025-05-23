let handler = async (m, { text, conn }) => {
  let targetNumber = text?.replace(/[^0-9]/g, '');
  let targetJid = targetNumber ? `${targetNumber}@s.whatsapp.net` : null;

  if (!targetJid) {
    await m.reply('❌ *Bitte gib einen Benutzer an, den du „eliminieren“ möchtest (z. B. @491234567890).*');
    return;
  }

  const steps = [
    `🎯 *Zielerfassung eingeleitet...*`,
    `📡 *Verbindung zu Satellit hergestellt...*`,
    `🔍 *Ziel: @${targetNumber} erfolgreich lokalisiert!*`,
    `🤖 *Analyse läuft...*`,
    `🔫 *Scharfschütze positioniert sich...*`,
    `💣 *Sprengsatz platziert...*`,
    `⏱️ *Countdown: 3... 2... 1...*`,
    `💥 *BOOM!*`,
    `☠️ *@${targetNumber} wurde eliminiert!*`,
    `🪦 *RIP @${targetNumber} – möge dein Akku in Frieden ruhen.*`,
    `✨ *Mission erfolgreich abgeschlossen.*`,
    `\n_Keine Sorge, war nur ein Spaß!_ 😜`
  ];

  for (let i = 0; i < steps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await conn.sendMessage(m.chat, {
      text: steps[i],
      mentions: [targetJid]
    }, { quoted: m });
  }
};

handler.command = ['startkill'];
handler.help = ['startkill [@user]'];
handler.tags = ['fun'];

module.exports = handler;