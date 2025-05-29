const { getLastYearly, setLastYearly, addBalance, initUser } = require('../lib/bank');
const ms = require('ms');

const free = 200000;
const prem = 400000;
const limitfree = 200;
const limitprem = 400;
const Münzenfree = 200000;
const Münzenprem = 400000;

let handler = async (m, { isPrems }) => {
  await initUser(m.sender); // sicherstellen, dass der Nutzer initialisiert ist

  const last = await getLastYearly(m.sender);
  const now = Date.now();
  const cooldown = 31536000000; // 1 Jahr in ms

  if (now - last < cooldown) {
    let remaining = msToTime(cooldown - (now - last));
    throw `📆 Du hast deinen jährlichen Bonus bereits beansprucht!\nBitte warte noch: *${remaining}*`;
  }

  const exp = isPrems ? prem : free;
  const coins = isPrems ? Münzenprem : Münzenfree;
  const limit = isPrems ? limitprem : limitfree;

  await addBalance(m.sender, coins);
  await setLastYearly(m.sender, now);

  m.reply(`🎊 *Jährlicher Bonus erhalten!*\n\n+${exp} Exp\n+${coins} Münzen\n+${limit} Limit`);
};

handler.help = ['yearly'];
handler.tags = ['rpgabsen'];
handler.command = /^yearly$/i;
handler.limit = true;
handler.rpg = true;
handler.fail = null;

module.exports = handler;

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);
  const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));

  return `${years > 0 ? years + ' Jahr(e) ' : ''}${days} Tage ${hours} Std ${minutes} Min ${seconds} Sek`;
}
