const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

const storeDatabaseFilePath = path.join(__dirname, 'store-database.json');

const loadStoreDatabase = () => {
    if (fs.existsSync(storeDatabaseFilePath)) {
        const data = fs.readFileSync(storeDatabaseFilePath);
        return JSON.parse(data);
    }
    return { store: {}, transactions: {}, setlist: {}, addlist: {} };
};

const saveStoreDatabase = (data) => {
    fs.writeFileSync(storeDatabaseFilePath, JSON.stringify(data, null, 2));
};

const handler = async (message, { isOwner }) => {
    const storeDatabase = loadStoreDatabase();
    storeDatabase.store = storeDatabase.store || {};
    storeDatabase.transactions = storeDatabase.transactions || {};

    const chatId = message.chat;
    storeDatabase.store[chatId] = storeDatabase.store[chatId] || [];
    storeDatabase.transactions[chatId] = storeDatabase.transactions[chatId] || [];

    const storeData = storeDatabase.store[chatId];
    const transactions = storeDatabase.transactions[chatId];

    if (!isOwner) throw `Nur owner das/der/die kann menyelesaikan transaksi.`;
    if (!message.quoted) throw `Harap reply zu nachricht das/der/die berisi bukti Bild mit caption id transaksi.`;
    const quotedMessage = message.quoted;
    const transactionId = quotedMessage.text.trim().toUpperCase();
    const transaction = transactions.find(t => t.transactionId === transactionId);

    if (!transaction) throw `id Transaksi nicht valid oder bereits kadaluarsa.`;

    const now = moment().tz('Asia/Jakarta');
    if (now.isAfter(moment(transaction.expiryTime))) {
        throw `id Transaksi nicht valid oder bereits kadaluarsa.`;
    }

    const replyMessage = `「 erfolgreich DISELESAIKAN DURCH ADMIN AQUA 」\n\n📆 TANGGAL : ${now.format('YYYY-MM-DD')}\n⌚ JAM     : ${now.format('HH:mm')}\n✨ STATUS  : erfolgreich\n\nEmpfangenkasih @${quotedMessage.sender.split('@')[0]}\n\nKami ucapkan vielen Dank bereits berbelanja in Geschäft wir, Di warte ya nachrichtan folgendes sein/ihr :D`;
    message.reply(replyMessage, null, { mentions: [quotedMessage.sender] });

    // Remove the transaction after completion
    const transactionIndex = transactions.findIndex(t => t.transactionId === transactionId);
    if (transactionIndex !== -1) {
        transactions.splice(transactionIndex, 1);
        saveStoreDatabase(storeDatabase);
    }
};

handler.customPrefix = /^done$/i;
handler.command = new RegExp;
module.exports = handler;

// no copas code von luar, logic verwenden kepala
// frei ubah weil open source
// danaputra133
// tutorial verwenden gibt in: https://youtu.be/sFj3Mh-z1Jk
