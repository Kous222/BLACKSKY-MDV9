let handler = async (m, { conn, args }) => {
  let sender = m.sender;
  let amount = parseInt(args[0]);

  // Überprüfen, ob der Betrag gültig ist
  if (!amount || isNaN(amount) || amount <= 0) return m.reply('❗ Bitte gib einen gültigen Betrag an.');

  // Sicherstellen, dass die Datenbank und der Benutzer existieren
  if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
  if (!global.db.data.users[sender]) global.db.data.users[sender] = { money: 0 };

  // Den Kontostand des Benutzers abrufen
  let balance = global.db.data.users[sender].money;

  // Überprüfen, ob der Benutzer genug Geld hat
  if (balance < amount) {
    return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto.');
  }

  // Den Betrag abheben
  global.db.data.users[sender].money -= amount;

  // Bestätigung des Abhebens
  await conn.sendMessage(m.chat, {
    text: `🏧 *Abhebung Erfolgreich!*\n\n💵 Betrag: *${amount} Münzen*\n✅ Viel Spaß beim Ausgeben!`,
  }, { quoted: m });
};

handler.command = ['withdraw', 'abheben'];
handler.help = ['withdraw [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
