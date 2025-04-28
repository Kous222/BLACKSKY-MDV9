const fs = require('fs');
const path = require('path');
const bankPath = path.join(__dirname, '../lib/bank.json');

let bank = {};

// Bank-Daten sicher laden
if (fs.existsSync(bankPath)) {
  try {
    const data = fs.readFileSync(bankPath, 'utf-8').trim();
    bank = data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Fehler beim Laden von bank.json:', e);
    bank = {};
    saveBank(); // Falls fehlerhaft: leere Bank-Datei neu speichern
  }
} else {
  saveBank();
}

// Speichern
function saveBank() {
  fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2));
}

// Nutzer initialisieren
function initUser(id) {
  id = id.split('@')[0];
  if (!bank[id]) {
    bank[id] = { balance: 0, lastDaily: 0 };
    saveBank();
  }
}

// Kontostand abrufen
function getBalance(id) {
  initUser(id);
  return bank[id.split('@')[0]].balance;
}

// Geld hinzufügen
function addBalance(id, amount) {
  initUser(id);
  bank[id.split('@')[0]].balance += amount;
  saveBank();
}

// Geld abziehen
function subtractBalance(id, amount) {
  initUser(id);
  let user = bank[id.split('@')[0]];
  user.balance -= amount;
  if (user.balance < 0) user.balance = 0;
  saveBank();
}

// Letzten Daily Bonus abfragen
function getLastDaily(id) {
  initUser(id);
  return bank[id.split('@')[0]].lastDaily;
}

// Timestamp für Daily Bonus setzen
function setLastDaily(id, timestamp) {
  initUser(id);
  bank[id.split('@')[0]].lastDaily = timestamp;
  saveBank();
}

module.exports = {
  getBalance,
  addBalance,
  subtractBalance,
  getLastDaily,
  setLastDaily
};
