const { getLastMonthly, setLastMonthly, addBalance, initUser } = require('../lib/bank');
const free = 20000;
const prem = 40000;
const limitfree = 20;
const limitprem = 40;
const Münzenfree = 20000;
const Münzenprem = 40000;

let handler = async (m, { isPrems }) => {
  const userId = m.sender;

  await initUser(userId);
  const lastClaim = await getLastMonthly(userId);
  const now = Date.now();
  const cooldown = 30 * 24 * 60 * 60 * 1000; // 30 Tage in ms

  if (now - lastClaim < cooldown) {
    const remaining = cooldown - (now - lastClaim);
    throw `🗓️ Du hast deinen monatlichen Bonus bereits beansprucht.\nBitte warte noch *${msToTime(remaining)}*, um erneut zu claimen.`;
  }

  const exp = isPrems ? prem : free;
  const coins = isPrems ? Münzenprem : Münzenfree;
  const limit = isPrems ? limitprem : limitfree;

  // Hier kannst du eigene Methoden ergänzen wie z.B. addLimit(userId, limit)
  await addBalance(userId, coins);
  await setLastMonthly(userId, now);

  conn.reply(m.chat, `🎉 *Monatlicher Bonus*\n\n+${exp} Exp\n+${coins} Münzen\n+${limit} Limit`, m);
};

handler.help = ['monthly'];
handler.tags = ['rpgabsen'];
handler.command = /^(monthly)$/i;
handler.limit = true;
handler.rpg = true;
handler.fail = null;

module.exports = handler;

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  return `${days} Tag(e), ${hours} Std, ${minutes} Min, ${seconds} Sek`;
}
