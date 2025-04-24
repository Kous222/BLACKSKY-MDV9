let handler = async (m, { conn }) => {
  const userId = m.sender;
  const userName = m.pushName || 'Unbekannt';
  
  if (!global.db.data.users[userId]) {
    return m.reply('❌ Du hast noch kein Bankkonto. Erstelle zuerst ein Konto mit .createaccount');
  }

  const balance = global.db.data.users[userId].balance;
  m.reply(`💰 *Kontostand von ${userName}:* ${balance}€`);
};

handler.command = ['balance'];
handler.help = ['balance'];
handler.tags = ['bank'];

module.exports = handler;
