const fs = require('fs');
const path = require('path');

const storeDatabaseFilePath = path.join(__dirname, 'store-database.json');

const loadStoreDatabase = () => {
    if (fs.existsSync(storeDatabaseFilePath)) {
        const data = fs.readFileSync(storeDatabaseFilePath);
        return JSON.parse(data);
    }
    return { store: {}, transactions: {}, setlist: {} };
};

const saveStoreDatabase = (data) => {
    fs.writeFileSync(storeDatabaseFilePath, JSON.stringify(data, null, 2));
};

const handler = async (message, { isOwner, usedPrefix }) => {
    const storeDatabase = loadStoreDatabase();
    storeDatabase.setlist = storeDatabase.setlist || {};

    const chatId = message.chat;

    if (!isOwner) throw `Nur owner das/der/die kann menglöschen setlist.`;

    if (storeDatabase.setlist[chatId]) {
        delete storeDatabase.setlist[chatId];
        saveStoreDatabase(storeDatabase);
        return message.reply(`erfolgreich menglöschen setlist für Gruppe dies!`);
    } else {
        return message.reply(`Setlist für Gruppe dies noch nicht diatur.`);
    }
};

handler.help = ['delsetlist'];
handler.tags = ['store'];
handler.command = /^delsetlist$/i;
handler.owner = true;
module.exports = handler;


// no copas code von luar, logic verwenden kepala
// frei ubah weil open source
// danaputra133
// tutorial verwenden gibt in: https://youtu.be/sFj3Mh-z1Jk