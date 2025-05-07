let handler = async (m, { conn, command, usedPrefix }) => {
  try {
    const who = m.sender;

    // Initialisiere Datenbank, falls nötig
    if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
    if (!global.db.data.users[who]) {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(who),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        role: 'Rekrut ㋡',
        autolevelup: true,
        dailyXP: 0,
        lastDailyReset: 0,
        totalMessages: 0,
        money: 0,
        lastDaily: 0
      };
    }

    let user = global.db.data.users[who];

    let now = Date.now();
    let cooldown = 24 * 60 * 60 * 1000;
    let remaining = cooldown - (now - user.lastDaily);

    let dailyAvailable = remaining <= 0;
    let dailyText = dailyAvailable
      ? `🎁 Tägliche Belohnung: *Verfügbar!*\n➔ Tippe: *${usedPrefix}daily*`
      : `⏳ Nächste Belohnung: *in ${Math.floor(remaining / (1000 * 60 * 60))}h ${(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)))}m*`;

    let text = `
🏦 *Deine Bankübersicht*

💳 *Kontostand:* ${user.money} Münzen

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
