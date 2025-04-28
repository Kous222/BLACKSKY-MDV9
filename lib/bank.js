const fs = require('fs');
const path = './lib/bank.json';

let bank = {};

if (fs.existsSync(path)) {
  bank = JSON.parse(fs.readFileSync(path));
} else {
  fs.writeFileSync(path, JSON.stringify({}));
}

// Speichern
function saveBank() {
  fs.writeFileSync(path, JSON.stringify(bank, null, 2));
}

// Kontostand abrufen
function getBalance(id) {
  id = id.split('@')[0];
  if (!(id in bank)) bank[id] = { balance: 0, lastDaily: 0 };
  return bank[id].balance;
}

// Geld hinzufügen
function addBalance(id, amount) {
  id = id.split('@')[0];
  if (!(id in bank)) bank[id] = { balance: 0, lastDaily: 0 };
  bank[id].balance += amount;
  saveBank();
}

// Geld abziehen
function subtractBalance(id, amount) {
  id = id.split('@')[0];
  if (!(id in bank)) bank[id] = { balance: 0, lastDaily: 0 };
  bank[id].balance -= amount;
  if (bank[id].balance < 0) bank[id].balance = 0;
  saveBank();
}

// Daily Bonus abfragen
function getLastDaily(id) {
  id = id.split('@')[0];
  if (!(id in bank)) bank[id] = { balance: 0, lastDaily: 0 };
  return bank[id].lastDaily;
}

// Daily Bonus setzen
function setLastDaily(id, timestamp) {
  id = id.split('@')[0];
  if (!(id in bank)) bank[id] = { balance: 0, lastDaily: 0 };
  bank[id].lastDaily = timestamp;
  saveBank();
}

module.exports = { getBalance, addBalance, subtractBalance, getLastDaily, setLastDaily };
