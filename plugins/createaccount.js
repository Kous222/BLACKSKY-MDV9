let handler = async (m, { conn }) => {
  const userId = m.sender;
  const userName = m.pushName || 'Unbekannt';
  
  if (global.db.data.users[userId]?.balance !== undefined) {
    return m.reply('❌ Du hast bereits ein Bankkonto!');
  }

  global.db.data.users[userId] = {
    balance: 0,  // Initial balance set to 0
    transactions: []  // Store transaction history
  };

  m.reply(`🎉 Willkommen in der Bank, ${userName}! Dein Konto wurde erfolgreich erstellt. Dein Kontostand ist 0€.`);
};

handler.command = ['createaccount'];
handler.help = ['createaccount'];
handler.tags = ['bank'];

module.exports = handler;
