
let handler = async (m, { conn, args }) => {
  let sender = m.sender;
  let amount = parseInt(args[0]);

  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an.\nBeispiel: .deposit 100');
  }

  if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
  if (!global.db.data.users[sender]) global.db.data.users[sender] = { money: 0 };

  global.db.data.users[sender].money += amount;

  await conn.sendMessage(m.chat, {
    text: `✅ *Einzahlung Erfolgreich!*\n\n💸 Betrag: *${amount} Münzen*\n📈 Neuer Kontostand: *${global.db.data.users[sender].money} Münzen*`,
  }, { quoted: m });
};

handler.command = ['deposit', 'einzahlen'];
handler.help = ['deposit [betrag]'];
handler.tags = ['economy'];

module.exports = handler;
