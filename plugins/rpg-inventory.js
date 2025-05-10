const { initUser } = require('../lib/bank');
const { getAllItems } = require('../lib/shopitems'); // Import the shop items

let handler = async (m, { command }) => {
  try {
    const user = await initUser(m.sender);

    const inv = user.inventory;
    const entries = Object.entries(inv).filter(([_, count]) => count > 0);
    const shopItems = getAllItems(); // Get all shop items for price or other details

    if (entries.length === 0) {
      return m.reply('📦 Dein Inventar ist leer.');
    }

    let text = '🎒 *Dein Inventar:*\n\n';
    
    // Sortiere die Items nach Namen (alphabetisch)
    entries.sort(([itemA], [itemB]) => itemA.localeCompare(itemB));

    // Durchlaufe die Items und füge sie zur Textnachricht hinzu
    for (let [item, count] of entries) {
      // Füge den Preis aus shopItems.js hinzu
      const price = shopItems[item.toLowerCase()] || 'Preis nicht verfügbar';

      // Füge Emojis oder spezielle Formatierungen hinzu, wenn nötig
      text += `• ${item.charAt(0).toUpperCase() + item.slice(1)}: ${count}x | Preis: ${price}\n`;
    }

    // Sende die Nachricht mit dem Inventar des Nutzers
    m.reply(text.trim());
  } catch (e) {
    console.error('Fehler beim Laden des Inventars:', e);
    m.reply('⚠️ Fehler beim Abrufen deines Inventars. Versuche es später erneut.');
  }
};

handler.command = ['inventory', 'inv'];
handler.help = ['inventory'];
handler.tags = ['economy'];

module.exports = handler;
