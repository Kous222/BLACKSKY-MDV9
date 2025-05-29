const { getBalance, addBalance, getLastWeekly, setLastWeekly } = require('../lib/bank');

const free = 10000;
const prem = 20000;
const limitfree = 10;
const limitprem = 20;

let handler = async (m, { conn, isPrems }) => {
  try {
    const id = m.sender.split('@')[0];
    const now = Date.now();
    const cooldown = 7 * 24 * 60 * 60 * 1000; // 1 Woche

    const last = await getLastWeekly(id);
    if (now - last < cooldown) {
      const remaining = cooldown - (now - last);
      return m.reply(`⏳ *Wöchentliche Belohnung bereits abgeholt!*\n\nBitte warte noch *${msToTime(remaining)}*, um erneut zu claimen.`);
    }

    const rewardExp = isPrems ? prem : free;
    const rewardCoins = isPrems ? prem : free;
    const rewardLimit = isPrems ? limitprem : limitfree;

    global.db.data.users[m.sender].exp += rewardExp;
    global.db.data.users[m.sender].limit += rewardLimit;

    await addBalance(id, rewardCoins);
    await setLastWeekly(id, now);

    const format = new Intl.NumberFormat('de-DE');

    await conn.sendMessage(m.chat, {
      text: `🎉 *Wöchentliche Belohnung!*\n\n✨ Du hast erhalten:\n\n• 🧪 *${format.format(rewardExp)}* XP\n• 💰 *${format.format(rewardCoins)}* Münzen\n• 🎟️ *${rewardLimit}* Limit\n\n📆 Komm nächste Woche wieder für neue Belohnungen!`,
    }, { quoted: m });

  } catch (e) {
    console.error('Fehler im Weekly-Plugin:', e);
    m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
  }
};

handler.help = ['weekly'];
handler.tags = ['rpgabsen'];
handler.command = /^(weekly)$/i;
handler.limit = true;
handler.fail = null;
handler.rpg = true;

module.exports = handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (1000 * 60 * 60 * 24));

  return `${days} Tag(e), ${hours}h ${minutes}min`;
}
