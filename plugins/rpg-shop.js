let handler = async (m, { conn }) => {
  // Lese die Shop-Items aus der Datei
  const { getAllItems } = require('./lib/shopItems'); // Importiere die Funktionen aus shopItems.js

  // Berechne Rüstungspreis
  const _armor = global.db.data.users[m.sender].Rüstung || 0;
  const Rüstung = _armor == 0 ? 20000 : _armor == 1 ? 49999 : _armor == 2 ? 99999 : _armor == 3 ? 149999 : _armor == 4 ? 299999 : '-';

  // Initialisiere den Shop-Nachrichtentext
  let shopMessage = `
╭━━⬣  *SHOP | RPG*  ⬣━━━◆
│ > *Rüstungskosten je nach Stufe*
│ 🔰 Deine Rüstung (${_armor}): ${Rüstung}
│ 
`;

  // Holen der gesamten Artikel aus der Funktion
  const items = getAllItems();

  // Kategorien für die Anzeige definieren
  const categories = {
    'Bedürfnisse': ['limit', 'haustier'],
    'Fruchtsamen': ['bananensamen', 'weintraubensamen', 'mangosamen', 'orangensamen', 'apfelsamen'],
    'Artikel': ['trank', 'diamant', 'smaragd', 'eisen', 'edelstein', 'gold', 'kohle', 'schnur', 'muell', 'flasche', 'dose', 'karton', 'holz', 'stein', 'schwert', 'gewoehnlich', 'ungewoehnlich', 'mythisch', 'legendär', 'elixier', 'heilspritze', 'benzin', 'ticketcoin', 'expkapsel', 'waffen'],
    'Lebensmittel': ['banane', 'weintraube', 'mango', 'orange', 'apfel', 'tierfutter', 'drachenfutter']
  };

  // Durchlaufe jede Kategorie und füge die Artikel zur Nachricht hinzu
  for (const [category, itemsList] of Object.entries(categories)) {
    shopMessage += `\n│ > *${category}*\n`;

    // Sortiere Artikel alphabetisch und füge sie zur Nachricht hinzu
    itemsList.forEach(item => {
      if (items[item]) {
        shopMessage += `│ ${items[item].emoji || '🛒'} ${item.charAt(0).toUpperCase() + item.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}: ${items[item]} ${items.currency || 'Coins'}\n`;
      }
    });
  }

  // Schließe den Shop-Text ab
  shopMessage += `╰━━━━━━━━━━━━━━━⬣`;

  // Sende die Nachricht
  await m.reply(shopMessage);
};

handler.help = ['shop'];
handler.tags = ['rpg'];
handler.command = /^shop$/i;

module.exports = handler;
