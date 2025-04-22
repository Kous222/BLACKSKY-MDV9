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

let handler = async (m, { conn, command }) => {
  const senderId = m.sender;
  const senderName = m.pushName || 'Unbekannt';

  // Ensure each user has a bank account
  if (!bankData[senderId]) {
    bankData[senderId] = { balance: 0, loans: 0, transactionHistory: [], lastDailyClaimed: null, workLastClaimed: null };
  }

  // Get user account info
  let accountInfo = bankData[senderId];

  let lastDailyClaimed = accountInfo.lastDailyClaimed ? moment(accountInfo.lastDailyClaimed).fromNow() : 'Noch nicht beansprucht';
  let workLastClaimed = accountInfo.workLastClaimed ? moment(accountInfo.workLastClaimed).fromNow() : 'Noch nicht gearbeitet';

  let transactionHistory = accountInfo.transactionHistory.slice(-5).map((txn, idx) => {
    return `${idx + 1}. ${txn.type}: ${txn.amount} Münzen am ${txn.date}`;
  }).join('\n') || 'Keine Transaktionen vorhanden.';

  // Send the account information to the user
  let response = `💼 *Dein Bankkonto:*

**Kontostand**: ${accountInfo.balance} Münzen
**Offene Schulden**: ${accountInfo.loans} Münzen

**Letztes tägliches Geschenk**: ${lastDailyClaimed}
**Letzte Arbeit**: ${workLastClaimed}

**Transaktionen der letzten 5 Vorgänge:**
${transactionHistory}`;

  m.reply(response);
};

handler.command = ['bankinfo', 'accountinfo', 'kontoinfo'];
handler.help = ['bankinfo'];
handler.tags = ['economy'];

module.exports = handler;
