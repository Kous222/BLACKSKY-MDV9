let handler = async (m, { conn, text }) => {
  // Check if the sender is the owner
  if (!global.owner.includes(m.sender.split('@')[0])) {
    return m.reply('❌ Du bist nicht der Besitzer!');
  }

  // Get the user to whom the money will be added
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;

  if (!who) return m.reply('❗ Bitte markiere jemanden!');

  // Check if the amount is provided and valid
  let amount = parseInt(text.split(' ')[1]);
  if (!amount || isNaN(amount) || amount <= 0) {
    return m.reply('❗ Bitte gib einen gültigen Betrag an!');
  }

  // Ensure database is initialized
  if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
  if (!global.db.data.users[who]) global.db.data.users[who] = { money: 0 };

  // Add money to the user's balance
  global.db.data.users[who].money += amount;

  // Respond with a success message
  await conn.sendMessage(m.chat, {
    text: `✅ *Erfolgreich!* ${amount} Münzen wurden dem Konto von @${who.split('@')[0]} hinzugefügt.`,
    mentions: [who],
  }, { quoted: m });
};

handler.help = ['addmoney [@user] [amount]'];
handler.tags = ['owner', 'economy'];
handler.command = /^(addmoney|fügeGeldhinzu)$/i;
handler.owner = true;

module.exports = handler;
