const Bank = require('../lib/bankModel'); // Assuming you have a Bank model for MongoDB
const { getLastDaily } = require('../lib/bank'); // keep getLastDaily or integrate with MongoDB

let handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const id = m.sender.split('@')[0]; // <- User ID from the sender
    let user = await Bank.findOne({ userId: id }); // Fetch user from MongoDB

    if (!user) {
      // If the user doesn't exist, create a new user record with a starting balance of 0
      user = new Bank({ userId: id, balance: 0, lastDaily: 0 });
      await user.save();
    }

    let balance = user.balance;
    let now = Date.now();
    let lastDaily = user.lastDaily;
    let cooldown = 24 * 60 * 60 * 1000;
    let remaining = cooldown - (now - lastDaily);

    let dailyAvailable = remaining <= 0;
    let dailyText = dailyAvailable
      ? `🎁 Tägliche Belohnung: *Verfügbar!*\n➔ Tippe: *${usedPrefix}daily*`
      : `⏳ Nächste Belohnung: *in ${Math.floor(remaining / (1000 * 60 * 60))}h ${(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)))}m*`;

    // Handle deposit
    if (command === 'deposit') {
      let amount = parseInt(args[0]);

      // Validate deposit amount
      if (!amount || isNaN(amount) || amount <= 0) {
        return m.reply('❗ Bitte gib einen gültigen Betrag zum Einzahlen an.');
      }

      user.balance += amount; // Add deposit amount
      await user.save(); // Save updated balance

      return conn.sendMessage(m.chat, {
        text: `💰 *Einzahlung Erfolgreich!* \n\n💵 Du hast *${amount} Münzen* eingezahlt! \n📊 Dein Kontostand: *${user.balance} Münzen*`,
      }, { quoted: m });
    }

    // Handle withdraw
    if (command === 'withdraw') {
      let amount = parseInt(args[0]);

      // Validate withdrawal amount
      if (!amount || isNaN(amount) || amount <= 0) {
        return m.reply('❗ Bitte gib einen gültigen Betrag zum Abheben an.');
      }

      // Check if user has enough balance
      if (user.balance < amount) {
        return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto, um diese Abhebung vorzunehmen.');
      }

      user.balance -= amount; // Subtract withdrawal amount
      await user.save(); // Save updated balance

      return conn.sendMessage(m.chat, {
        text: `🏧 *Abhebung Erfolgreich!* \n\n💵 Du hast *${amount} Münzen* abgehoben! \n📊 Dein Kontostand: *${user.balance} Münzen*`,
      }, { quoted: m });
    }

    // Handle transfer
    if (command === 'transfer') {
      let amount = parseInt(args[0]);
      let recipientJid = args[1]?.replace('@', '') + '@s.whatsapp.net'; // Get the recipient JID

      // Validate amount and recipient
      if (!amount || isNaN(amount) || amount <= 0) {
        return m.reply('❗ Bitte gib einen gültigen Betrag zum Überweisen an.');
      }

      if (!recipientJid) {
        return m.reply('❗ Bitte gib einen Empfänger an (z. B. @user).');
      }

      // Check if user has enough balance
      if (user.balance < amount) {
        return m.reply('❗ Du hast nicht genug Münzen auf deinem Konto, um diese Überweisung vorzunehmen.');
      }

      let recipient = await Bank.findOne({ userId: recipientJid });

      if (!recipient) {
        // If recipient doesn't exist, create a new record
        recipient = new Bank({ userId: recipientJid, balance: 0, lastDaily: 0 });
        await recipient.save();
      }

      // Subtract amount from sender's balance
      user.balance -= amount;

      // Add amount to recipient's balance
      recipient.balance += amount;

      // Save both sender and recipient balances
      await user.save();
      await recipient.save();

      // Send confirmation message to sender
      await conn.sendMessage(m.chat, {
        text: `✅ *Überweisung Erfolgreich!* \n\n💵 Du hast *${amount} Münzen* an *${args[1]}* überwiesen! \n📊 Dein Kontostand: *${user.balance} Münzen*`,
      }, { quoted: m });

      // Send confirmation message to recipient
      await conn.sendMessage(recipientJid, {
        text: `🎉 *Neue Überweisung!* \n\n💵 Du hast *${amount} Münzen* von *${m.sender.split('@')[0]}* erhalten! \n📊 Dein Kontostand: *${recipient.balance} Münzen*`,
      });
    }

    // Display bank overview with daily rewards
    let text = `
🏦 *Deine Bankübersicht*

💳 *Kontostand:* ${balance} Münzen

${dailyText}

📥 *Einzahlen:* ${usedPrefix}deposit [Betrag]
📤 *Abheben:* ${usedPrefix}withdraw [Betrag]
🤝 *Überweisen:* ${usedPrefix}transfer @user [Betrag]

💡 Tipp: Bleibe aktiv und sammele täglich deine Belohnung, um reicher zu werden!
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
  } catch (e) {
    console.error('Fehler im Bank-Plugin:', e);
    m.reply('⚠️ Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
  }
};

handler.command = ['bank', 'meinebank', 'konto', 'deposit', 'withdraw', 'transfer'];
handler.help = ['bank', 'deposit [Betrag]', 'withdraw [Betrag]', 'transfer [Betrag] @user'];
handler.tags = ['economy'];

module.exports = handler;
