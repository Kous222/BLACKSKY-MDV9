// sell.js

const { initUser, addBalance, removeItem } = require('../lib/bank');
const { getItemPrice, isValidItem } = require('../lib/shopItems');

let handler = async (m, { args }) => {
  const item = args[0]?.toLowerCase();
  const amount = parseInt(args[1]) || 1;

  if (!item || !isValidItem(item)) return m.reply('❌ Gib ein gültiges Item an.');

  const user = await initUser(m.sender);
  const itemCount = user.inventory[item] || 0;

  if (itemCount < amount) return m.reply(`❌ Du hast nicht genug *${item}* zum verkaufen. Verfügbar: ${itemCount}`);

  const price = getItemPrice(item) * amount;

  // Balance erhöhen und Item aus Inventar entfernen
  await addBalance(m.sender, price);
  user.inventory[item] -= amount;
  await user.save();

  m.reply(`✅ Du hast *${amount} ${item}* für *${price} Münzen* verkauft.`);
};

handler.command = ['sell'];
handler.help = ['sell <item> [anzahl]'];
handler.tags = ['economy'];

module.exports = handler;
