let handler = async (m, { conn }) => {
  let sender = m.sender;
  
  if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
  if (!global.db.data.users[sender]) global.db.data.users[sender] = { money: 0 };

  let balance = global.db.data.users[sender].money;

  await conn.sendMessage(m.chat, {
    text: `🏦 *Kontostand*\n\n💳 Du hast aktuell *${balance} Münzen* auf deinem Konto.\n\n💡 Bleib aktiv, um noch reicher zu werden!`,
  }, { quoted: m });
};

handler.command = ['balance', 'bal', 'kontostand'];
handler.help = ['balance'];
handler.tags = ['economy'];

module.exports = handler;
