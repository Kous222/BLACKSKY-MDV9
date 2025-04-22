const fs = require('fs');
const moment = require('moment');

// Load the bank data
const bankDataPath = './bank.json';
let bankData = {};
if (fs.existsSync(bankDataPath)) {
  bankData = JSON.parse(fs.readFileSync(bankDataPath));
}

// Function to save bank data to file
const saveBankData = () => {
  fs.writeFileSync(bankDataPath, JSON.stringify(bankData, null, 2));
};

let handler = async (m, { conn, command, text }) => {
  const senderId = m.sender;
  const senderName = m.pushName || 'Unbekannt';

  // Ensure each user has a bank account
  if (!bankData[senderId]) {
    bankData[senderId] = { balance: 0, loans: 0, transactionHistory: [], lastDailyClaimed: null, workLastClaimed: null };
  }

  switch (command) {
    case 'balance':
      m.reply(`💰 Dein Kontostand: ${bankData[senderId].balance} Münzen.`);
      break;

    case 'deposit':
      let amountToDeposit = parseInt(text);
      if (isNaN(amountToDeposit) || amountToDeposit <= 0) throw '❌ Ungültiger Betrag!';
      
      // Bank fee (5% per deposit)
      let fee = Math.floor(amountToDeposit * 0.05);
      let netAmount = amountToDeposit - fee;

      bankData[senderId].balance += netAmount;
      bankData[senderId].transactionHistory.push({ type: 'Deposit', amount: netAmount, date: moment().format('YYYY-MM-DD HH:mm:ss') });

      saveBankData();
      m.reply(`💰 Du hast ${netAmount} Münzen eingezahlt. Bankgebühr von ${fee} Münzen abgezogen. Dein neuer Kontostand ist ${bankData[senderId].balance} Münzen.`);
      break;

    case 'withdraw':
      let amountToWithdraw = parseInt(text);
      if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) throw '❌ Ungültiger Betrag!';
      if (amountToWithdraw > bankData[senderId].balance) throw '❌ Du hast nicht genügend Münzen!';
      
      // Bank fee (2% per withdrawal)
      let withdrawalFee = Math.floor(amountToWithdraw * 0.02);
      let netWithdrawAmount = amountToWithdraw - withdrawalFee;

      bankData[senderId].balance -= netWithdrawAmount;
      bankData[senderId].transactionHistory.push({ type: 'Withdrawal', amount: netWithdrawAmount, date: moment().format('YYYY-MM-DD HH:mm:ss') });

      saveBankData();
      m.reply(`💰 Du hast ${netWithdrawAmount} Münzen abgehoben. Bankgebühr von ${withdrawalFee} Münzen abgezogen. Dein neuer Kontostand ist ${bankData[senderId].balance} Münzen.`);
      break;

    case 'daily':
      // Check if the user has already claimed their daily reward
      let now = moment();
      if (bankData[senderId].lastDailyClaimed && now.diff(moment(bankData[senderId].lastDailyClaimed), 'days') < 1) {
        throw '❌ Du hast dein tägliches Geschenk bereits heute abgeholt. Komm morgen wieder!';
      }

      // Give daily reward (random amount between 50 and 200 coins)
      let dailyReward = Math.floor(Math.random() * 151) + 50;
      bankData[senderId].balance += dailyReward;
      bankData[senderId].lastDailyClaimed = now.toISOString();
      bankData[senderId].transactionHistory.push({ type: 'Daily Reward', amount: dailyReward, date: now.format('YYYY-MM-DD HH:mm:ss') });

      saveBankData();
      m.reply(`🎁 Du hast dein tägliches Geschenk erhalten: ${dailyReward} Münzen! Dein neuer Kontostand ist ${bankData[senderId].balance} Münzen.`);
      break;

    case 'work':
      // Check if the user has already worked in the past 5 minutes
      let workCooldown = moment().diff(moment(bankData[senderId].workLastClaimed), 'minutes');
      if (workCooldown < 5) {
        throw `❌ Du kannst nur alle 5 Minuten arbeiten. Bitte warte noch ${5 - workCooldown} Minuten.`;
      }

      // Earn coins from working
      let workReward = Math.floor(Math.random() * 100) + 20; // Random reward between 20 and 100 coins
      bankData[senderId].balance += workReward;
      bankData[senderId].workLastClaimed = moment().toISOString();
      bankData[senderId].transactionHistory.push({ type: 'Work Reward', amount: workReward, date: moment().format('YYYY-MM-DD HH:mm:ss') });

      saveBankData();
      m.reply(`💼 Du hast ${workReward} Münzen durch Arbeiten verdient! Dein neuer Kontostand ist ${bankData[senderId].balance} Münzen.`);
      break;

    case 'competition':
      let rewardAmount = Math.floor(Math.random() * 500) + 100; // Random reward between 100 and 500
      bankData[senderId].balance += rewardAmount;
      bankData[senderId].transactionHistory.push({ type: 'Competition Reward', amount: rewardAmount, date: moment().format('YYYY-MM-DD HH:mm:ss') });

      saveBankData();
      m.reply(`🏆 Du hast an einem Wettbewerb teilgenommen und ${rewardAmount} Münzen gewonnen! Dein neuer Kontostand ist ${bankData[senderId].balance} Münzen.`);
      break;

    default:
      m.reply('❗ Unbekannter Befehl. Nutze .bankhelp für Hilfe.');
      break;
  }
};

handler.command = ['balance', 'deposit', 'withdraw', 'daily', 'work', 'competition', 'bankhistory'];
handler.help = ['balance', 'deposit <amount>', 'withdraw <amount>', 'daily', 'work', 'competition', 'bankhistory', 'bankhelp'];
handler.tags = ['economy'];

module.exports = handler;
