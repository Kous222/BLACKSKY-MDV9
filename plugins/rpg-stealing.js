const { initUser, addBalance, subtractBalance } = require('../lib/bank'); // ggf. Pfad anpassen
const timeout = 3 * 60 * 60 * 1000; // 3 Stunden Cooldown

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const stealerId = m.sender;
    const mentionedJid = m.mentionedJid && m.mentionedJid[0];

    if (!mentionedJid) {
      return m.reply(`❗ Wen möchtest du bestehlen?\n\nBeispiel: *${usedPrefix}steal @user*`);
    }

    if (mentionedJid === stealerId) {
      return m.reply('🙃 Du kannst dich nicht selbst bestehlen.');
    }

    let stealer = await initUser(stealerId);
    let target = await initUser(mentionedJid);

    let now = Date.now();

    if (stealer.lastSteal && now - stealer.lastSteal < timeout) {
      let remaining = timeout - (now - stealer.lastSteal);
      return m.reply(`⏳ Du musst noch ${msToTime(remaining)} warten, bevor du erneut stehlen kannst.`);
    }

    if (target.balance <= 0) {
      return m.reply(`😞 @${mentionedJid.split('@')[0]} hat keine Münzen, die du stehlen könntest.`, null, { mentions: [mentionedJid] });
    }

    let maxSteal = Math.min(Math.floor(target.balance * 0.3), 30000);
    let stolen = Math.floor(Math.random() * maxSteal) + 1;

    await subtractBalance(mentionedJid, stolen);
    await addBalance(stealerId, stolen);

    stealer.lastSteal = now;
    await stealer.save();

    await conn.reply(
      m.chat,
      `🦹‍♂️ Du hast erfolgreich ${stolen} Münzen von @${mentionedJid.split('@')[0]} gestohlen! 💰`,
      m,
      { mentions: [mentionedJid] }
    );
  } catch (err) {
    console.error('Fehler beim Stehlen:', err);
    m.reply('⚠️ Fehler beim Ausführen des Befehls. Bitte versuche es erneut.');
  }
};

handler.help = ['steal @user'];
handler.tags = ['rpg'];
handler.command = /^steal$/i;

module.exports = handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)));

  return `${hours}h ${minutes}m ${seconds}s`;
}
