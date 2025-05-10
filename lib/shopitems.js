// lib/shopItems.js

const shopItems = {
  // Bedürfnisse
  limit: 5,
  haustier: 150000,

  // Fruchtsamen
  bananensamen: 550,
  weintraubensamen: 550,
  mangosamen: 550,
  orangensamen: 550,
  apfelsamen: 550,

  // Artikel
  trank: 20000,
  diamant: 100000,
  smaragd: 500000,
  eisen: 20000,
  edelstein: 150000,
  gold: 150000,
  kohle: 1500,
  schnur: 50000,
  müll: 120,
  flasche: 300,
  dose: 400,
  karton: 400,
  holz: 1000,
  stein: 500,
  schwert: 150000,
  gewöhnlich: 100000,
  ungewöhnlich: 100000,
  mythisch: 100000,
  legendär: 200000,
  elixier: 500,
  heilspritze: 15000,
  benzin: 20000,
  ticketcoin: 500,
  expkapsel: 500000,
  waffen: 150000,

  // Lebensmittel
  banane: 5500,
  weintraube: 5500,
  mango: 4600,
  orange: 6000,
  apfel: 5500,
  tierfutter: 50000,
  drachenfutter: 150000
};

function getItemPrice(item) {
  return shopItems[item.toLowerCase()] || null;
}

function isValidItem(item) {
  return item.toLowerCase() in shopItems;
}

function getAllItems() {
  return shopItems;
}

module.exports = {
  getItemPrice,
  isValidItem,
  getAllItems
};
