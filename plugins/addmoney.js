const { addBalance, initUser } = require('../lib/bank');

let handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    // Extracting the target user and amount
    let target = m.mentionedJid[0] || args[0]; // If a user is tagged, use that; otherwise, the first argument
    const amount = parseInt(args[1]); // Amount is the second argument

    if (!target) {
      return m.reply('⚠️ Bitte gib den Benutzer an, dem du Geld hinzufügen möchtest. Beispiel: @Benutzer 100');
    }

    if (isNaN(amount) || amount <= 0) {
      return m.reply('⚠️ Bitte gib einen gültigen Betrag an, den du hinzufügen möchtest.');
    }

    // Initialize the target user
    let user = await initUser(target);

    // Add the balance to the target user
    await addBalance(target, amount);

    // Respond with the success message
    m.reply(`💰 *${amount}* Münzen wurden erfolgreich zu *${target}*'s Konto hinzugefügt!\n💳 *Neuer Kontostand:* ${user.balance} Münzen`);
  } catch (e) {
    console.error('Fehler im addmoney-Plugin:', e);
    m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
  }
};

handler.command = ['addmoney', 'geldhinzufügen'];
handler.help = ['addmoney [Benutzer] [Betrag]'];
handler.tags = ['economy'];
handler.admin = true; // Only admins can use this command

module.exports = handler;
