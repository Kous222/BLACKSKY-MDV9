//free source code store by betabotz in erstellen durch danapura133
//bitte in ändern ändern sesuka hati ihr

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

const handler = async (message, { usedPrefix, text, command, isOwner, conn }) => {
    const storeDatabase = loadStoreDatabase();
    storeDatabase.store = storeDatabase.store || {};
    storeDatabase.transactions = storeDatabase.transactions || {};
    storeDatabase.setlist = storeDatabase.setlist || {};
    storeDatabase.addlist = storeDatabase.addlist || {};

    const chatId = message.chat;
    storeDatabase.store[chatId] = storeDatabase.store[chatId] || [];
    storeDatabase.transactions[chatId] = storeDatabase.transactions[chatId] || [];
    storeDatabase.setlist[chatId] = storeDatabase.setlist[chatId] || '';

    const storeData = storeDatabase.store[chatId];
    const transactions = storeDatabase.transactions[chatId];
    const setlist = storeDatabase.setlist[chatId];
    const addListData = storeDatabase.addlist;

    if (command === 'liststore') {
        if (!storeData.length) throw `Belum gibt Gegenstand in store. Gunakan *${usedPrefix}addlist* für hinzufügen.`;

        if (!setlist) {
            return message.reply(`Setlist noch nicht diatur! Bitte erstellen erst in *${usedPrefix}setlist*`);
        }

        const greetings = (() => {
            const hours = moment().tz('Asia/Jakarta').hour();
            return hours < 6 ? 'Herzlichen Glückwunsch Malam' : hours < 12 ? 'Herzlichen Glückwunsch Pagi' : hours < 18 ? 'Herzlichen Glückwunsch Siang' : 'Herzlichen Glückwunsch Sore';
        })();

        const userName = message.pushName || message.name || 'Theman';
        const itemList = storeData.map(Gegenstand => `⇒ ${Gegenstand.key}`).join('\n');

        const replyMessage = `${greetings}, ${userName}!

${setlist.replace('⇒', itemList)}

*Tippe name Wort kunci für mengbenutzenya!*`;
        return message.reply(replyMessage);
    }

    if (command === 'dellist') {
        if (!isOwner) throw `Nur owner das/der/die kann menglöschen Gegenstand von store.`;
        if (!text) throw `Harap tentukan Gegenstand das/der/die wird dilöschen. Contoh: *${usedPrefix}${command} namaItem*`;

        const itemIndex = storeData.findIndex(Gegenstand => Gegenstand.key.toLowerCase() === text.toLowerCase());
        if (itemIndex !== -1) {
            const removedItem = storeData.splice(itemIndex, 1);
            saveStoreDatabase(storeDatabase);
            return message.reply(`erfolgreich menglöschen *${removedItem[0].key}* von liste store!`);
        } else {
            throw `Item *${text}* nicht gefunden. Gunakan *${usedPrefix}liststore* für meansehen liste Gegenstand.`;
        }
    }

    if (command === 'bearbeitenlist') {
        if (!isOwner) throw `Nur owner das/der/die kann mengbearbeiten Gegenstand in store.`;
        if (!text.includes('|')) throw `Format nicht valid. Contoh: *${usedPrefix}${command} namaItem | responsNeu*`;

        const [key, ...responseParts] = text.split('|').map(part => part.trim());
        const newResponse = responseParts.join('|');

        if (!key || !newResponse) throw `Format nicht valid. Contoh: *${usedPrefix}${command} namaItem | responsNeu*`;

        const Gegenstand = storeData.find(Gegenstand => Gegenstand.key === key);
        if (Gegenstand) {
            Gegenstand.response = newResponse;
            saveStoreDatabase(storeDatabase);
            return message.reply(`erfolgreich mengbearbeiten Gegenstand *${key}*!`);
        } else {
            throw `Item *${key}* nicht gefunden. Gunakan *${usedPrefix}liststore* für meansehen liste Gegenstand.`;
        }
    }

    //falls in grebek jb chat aja erlan

    if (command === 'transaksi') {
        if (!isOwner) throw `Nur owner das/der/die kann verarbeiten transaksi.`;
        if (!text.includes('|')) throw `Format nicht valid. Contoh: *${usedPrefix}${command} @user|namaItem*`;

        const [userTag, itemKey] = text.split('|').map(part => part.trim().toLowerCase());
        const Gegenstand = storeData.find(Gegenstand => Gegenstand.key.toLowerCase() === itemKey);
        if (!Gegenstand) throw `Item *${itemKey}* nicht gefunden. Gunakan *${usedPrefix}liststore* für meansehen liste Gegenstand.`;

        const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase();
        const now = moment().tz('Asia/Jakarta');
        const expiryTime = now.add(5, 'minutes').toISOString();

        transactions.push({ transactionId, userTag, itemKey, expiryTime });
        saveStoreDatabase(storeDatabase);

        const replyMessage = `Transaksi erfolgreich dierstellen!\n\nID Transaksi: ${transactionId}\nPembeli: ${userTag}\nItem: ${itemKey}\n\nSilakan lakukan pembayaran in Zeit 5 menit. Metode pembayaran kann diansehen in *bayar*\n\nSilakan lakukan pembayaran und senden bukti pembayaran mit caption id Transaksi.`;
        await message.reply(replyMessage);
        return message.reply(`${transactionId}`);
    }

    if (text && !command) {
        const keyword = text.toLowerCase();
        const matchedItem = storeData.find(Gegenstand => Gegenstand.key.toLowerCase() === keyword) || addListData[keyword];

        if (matchedItem) {
            if (message.hasMedia) {
                return; 
            } else {
                if (matchedItem.isImage) {
                    return await this.sendMedia(message.chat, matchedItem.imageUrl, message, { caption: matchedItem.response });
                } else {
                    return message.reply(matchedItem.response);
                }
            }
        }
    }
};

handler.help = ['liststore', 'dellist', 'bearbeitenlist', 'transaksi'];
handler.tags = ['store'];
handler.command = /^liststore|dellist|bearbeitenlist|transaksi$/i;
handler.owner = false; 

module.exports = handler;

module.exports.all = async (message) => {
    const storeDatabase = loadStoreDatabase();
    storeDatabase.store = storeDatabase.store || {};
    storeDatabase.transactions = storeDatabase.transactions || {};
    storeDatabase.setlist = storeDatabase.setlist || {};
    storeDatabase.addlist = storeDatabase.addlist || {};

    const chatId = message.chat;
    storeDatabase.store[chatId] = storeDatabase.store[chatId] || [];
    storeDatabase.transactions[chatId] = storeDatabase.transactions[chatId] || [];
    storeDatabase.setlist[chatId] = storeDatabase.setlist[chatId] || '';

    const storeData = storeDatabase.store[chatId];
    const addListData = storeDatabase.addlist;
    const text = message.text.toLowerCase();
    const matchedItem = storeData.find(Gegenstand => Gegenstand.key.toLowerCase() === text) || addListData[text];

    if (matchedItem) {
        if (matchedItem.isImage) {
            return await this.sendMedia(message.chat, matchedItem.imageUrl, message, { caption: matchedItem.response });
        } else {
            return message.reply(matchedItem.response);
        }
    }
};


// no copas code von luar, logic verwenden kepala
// frei ubah weil open source
// danaputra133
// tutorial verwenden gibt in: https://youtu.be/sFj3Mh-z1Jk