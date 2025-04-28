const { getBalance, getLastDaily } = require('../lib/bank');

let handler = async (m, { conn, command, usedPrefix }) => {
  try {
    const id = m.sender.split('@')[0]; // <- Korrektur hier!
    let balance = getBalance(id);
    let now = Date.now();
    let lastDaily = getLastDaily(id);
    let cooldown = 24 * 60 * 60 * 1000;
    let remaining = cooldown - (now - lastDaily);

    let dailyAvailable = remaining <= 0;
    let dailyText = dailyAvailable
      ? `🎁 Tägliche Belohnung: *Verfügbar!*\n➔ Tippe: *${usedPrefix}daily*`
      : `⏳ Nächste Belohnung: *in ${Math.floor(remaining / (1000 * 60 * 60))}h ${(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)))}m*`;

    let text = `
🏦 *Deine Bankübersicht*

💳 *Kontostand:* ${balance} Münzen

${dailyText}

📥 *Einzahlen:* ${usedPrefix}deposit [Betrag]
📤 *Abheben:* ${usedPrefix}withdraw [Betrag]
🤝 *Überweisen:* ${usedPrefix}transfer @user [Betrag]

💡 Tipp: Bleibe aktiv und sammele täglich deine Belohnung, um reicher zu werden!
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
  } catch (e) {
    console.error('Fehler im Bank-Plugin:', e);
    m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
  }
};

handler.command = ['bank', 'meinebank', 'konto'];
handler.help = ['bank'];
handler.tags = ['economy'];

module.exports = handler;
