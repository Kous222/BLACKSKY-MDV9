// buy.js

const { initUser, subtractBalance, addBalance } = require('../lib/bank');
const { getItemPrice, isValidItem } = require('../lib/shopitems');

let handler = async (m, { args }) => {
  const item = args[0]?.toLowerCase();
  const amount = parseInt(args[1]) || 1;

  if (!item || !isValidItem(item)) return m.reply('❌ Gib ein gültiges Item an.');

  const user = await initUser(m.sender);
  const price = getItemPrice(item) * amount;

  // Überprüfe, ob der Benutzer genug Balance hat
  if (user.balance < price) return m.reply(`💸 Du hast nicht genug Münzen. Benötigt: ${price} Münzen.`);

  // Balance abziehen und Item hinzufügen
  await subtractBalance(m.sender, price);
  user.inventory[item] = (user.inventory[item] || 0) + amount;
  await user.save();

  m.reply(`✅ Du hast *${amount} ${item}* für *${price} Münzen* gekauft.`);
};

handler.command = ['buy'];
handler.help = ['buy <item> [anzahl]'];
handler.tags = ['economy'];

module.exports = handler;
