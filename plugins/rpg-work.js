<<<<<<< HEAD
const { addSaldo } = require('../lib/bank'); // Adjust the path if needed!

let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase();
    let users = global.db.data.users[m.sender];
    let time = users.lastkerja + 300000;
    let __timers = (new Date - users.lastkerja);
=======
const mongoose = require('mongoose');

// MongoDB Schema for Users (if not defined elsewhere)
const userSchema = new mongoose.Schema({
    sender: String,
    balance: { type: Number, default: 0 },
    lastkerja: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase();
    
    // Fetch user from MongoDB (create if not exists)
    let user = await User.findOne({ sender: m.sender });
    if (!user) {
        user = new User({ sender: m.sender });
        await user.save();
    }

    let time = user.lastkerja + 300000;
    let __timers = (new Date - user.lastkerja);
>>>>>>> fc7a41b (Erster Commit)
    let _timers = (0 - __timers);
    let timers = clockString(_timers);

    let penumpan = ['Herr', 'Dame', 'Student', 'Schüler', 'ältere Dame'];
    let penumpang = pickRandom(penumpan);
    let daganga = ['Karotten', 'Kohl', 'Salat', 'Tomaten', 'Sellerie', 'Chili', 'Fleisch', 'Fisch', 'Hühnchen'];
    let dagangan = pickRandom(daganga);
    let pasie = ['Kopfschmerzen', 'Verletzung', 'Verbrennung', 'Knochenbruch'];
    let pasien = pickRandom(pasie);
    let pane = ['Karotten', 'Kohl', 'Erdbeeren', 'Tee', 'Reis', 'Orangen', 'Bananen', 'Wassermelonen', 'Durian', 'Rambutan'];
    let panen = pickRandom(pane);
    let bengke = ['Auto', 'Motorrad', 'Rikscha', 'Taxi', 'Bus', 'Kleinbus', 'Dreirad', 'Fahrrad'];
    let bengkel = pickRandom(bengke);
    let ruma = ['Haus bauen', 'Gebäude bauen', 'Haus reparieren', 'Gebäude reparieren', 'Öffentliche Einrichtung bauen', 'Öffentliche Einrichtung reparieren'];
    let rumah = pickRandom(ruma);
    let pnjh = ['Dieb', 'Verkehrssünder', 'Bankräuber', 'Taschendieb', 'Korruptionsverdächtiger'];
    let pnjht = pickRandom(pnjh);
    
    if (/kerjadulu|arbeiten|work|arbeit/i.test(command)) {
<<<<<<< HEAD
        if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für 🕜 ${clockString(time - new Date())}`);
=======
        if (new Date - user.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für 🕜 ${clockString(time - new Date())}`);
>>>>>>> fc7a41b (Erster Commit)

        let hasil = Math.floor(Math.random() * 5000000);
        let message;

        switch (type) {
            case 'ojek':
                message = `Du hast *${penumpang}* transportiert 🚗\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            case 'pedagang':
                message = `Du hast Kunden gewonnen, die *${dagangan}* kaufen 🛒\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            case 'dokter':
                message = `Du hast einen Patienten mit *${pasien}* geheilt 💉\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            case 'petani':
                message = `Du hast *${panen}* geerntet! 🌽 Und verkauft 🧺\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            case 'montir':
                message = `Du hast ein *${bengkel} 🔧* repariert\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            case 'kuli':
                message = `Du hast ${rumah} fertiggestellt 🔨\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            case 'polisi':
                message = `Du hast einen ${pnjht} verhaftet 🚨\nUnd erhältst dafür *${hasil} Münzen*`;
                break;
            default:
                let judul = `
_*Wähle einen Beruf, den du ausüben möchtest*_

- Arzt [👨‍⚕]
- Händler [👨🏻‍🍳]
- Fahrer [🛵]
- Bauarbeiter [👷‍♂️]
- Mechaniker [👨‍🔧]
- Bauer [👨‍🌾]
- Polizist [👮]
`;
                let msg = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                            interactiveMessage: {
                                body: { text: judul },
                                footer: { text: `by Killua Fourteen` },
                                header: { title: '', subtitle: '', hasMediaAttachment: false },
                                nativeFlowMessage: {
                                    buttons: [{
                                        name: "single_select",
                                        buttonParamsJson: JSON.stringify({
                                            title: "Wähle einen Beruf",
                                            sections: [{
                                                title: 'Berufsliste',
                                                highlight_label: 'Auswählen',
                                                rows: [
                                                    { title: 'Arzt [👨‍⚕]', description: "Als Arzt arbeiten", id: `.arbeiten dokter` },
                                                    { title: 'Händler [👨🏻‍🍳]', description: "Als Händler arbeiten", id: `.arbeiten pedagang` },
                                                    { title: 'Fahrer [🛵]', description: "Als Fahrer arbeiten", id: `.arbeiten ojek` },
                                                    { title: 'Bauarbeiter [👷‍♂️]', description: "Als Bauarbeiter arbeiten", id: `.arbeiten kuli` },
                                                    { title: 'Mechaniker [👨‍🔧]', description: "Als Mechaniker arbeiten", id: `.arbeiten montir` },
                                                    { title: 'Bauer [👨‍🌾]', description: "Als Bauer arbeiten", id: `.arbeiten petani` },
                                                    { title: 'Polizist [👮]', description: "Als Polizist arbeiten", id: `.arbeiten polisi` }
                                                ]
                                            }]
                                        })
                                    }]
                                },
                                contextInfo: { quotedMessage: m.message, participant: m.sender, ...m.key }
                            },
                        },
                    },
                };
                return conn.relayMessage(m.chat, msg, {});
        }

<<<<<<< HEAD
        // After a valid profession is chosen:
        await m.reply(message);

        // Update the user's balance
        await addSaldo(m.sender, hasil, 'Münzen'); // Update the balance in the bank system

        // Save the new data to the database
        users.lastkerja = new Date * 1;
=======
        // Update user's balance in the database
        user.balance += hasil;
        await user.save();

        // Update the last work time
        user.lastkerja = new Date().getTime();
        await user.save();

        // Send message to user
        await m.reply(message);
>>>>>>> fc7a41b (Erster Commit)
    }
};

handler.help = ['arbeiten', 'arbeit', 'work'];
handler.tags = ['rpg'];
handler.command = /^(arbeiten|arbeit|work)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;

module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
