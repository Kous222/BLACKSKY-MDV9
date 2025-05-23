const { addSaldo } = require('../lib/bank');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    sender: String,
    balance: { type: Number, default: 0 },
    lastkerja: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase();
    let user = await User.findOne({ sender: m.sender });
    if (!user) {
        user = new User({ sender: m.sender });
        await user.save();
    }

    let cooldown = 300000;
    let remaining = user.lastkerja + cooldown - Date.now();
    if (remaining > 0)
        return m.reply(`Du arbeitest bereits\nZeit für eine Pause für 🕜 ${clockString(remaining)}`);

    let hasil = Math.floor(Math.random() * 5000000);
    let message;

    let penumpang = pickRandom(['Herr', 'Dame', 'Student', 'Schüler', 'ältere Dame']);
    let dagangan = pickRandom(['Karotten', 'Kohl', 'Salat', 'Tomaten', 'Sellerie', 'Chili', 'Fleisch', 'Fisch', 'Hühnchen']);
    let pasien = pickRandom(['Kopfschmerzen', 'Verletzung', 'Verbrennung', 'Knochenbruch']);
    let panen = pickRandom(['Karotten', 'Kohl', 'Erdbeeren', 'Tee', 'Reis', 'Orangen', 'Bananen', 'Wassermelonen', 'Durian', 'Rambutan']);
    let bengkel = pickRandom(['Auto', 'Motorrad', 'Rikscha', 'Taxi', 'Bus', 'Kleinbus', 'Dreirad', 'Fahrrad']);
    let rumah = pickRandom(['Haus bauen', 'Gebäude bauen', 'Haus reparieren', 'Gebäude reparieren', 'Öffentliche Einrichtung bauen', 'Öffentliche Einrichtung reparieren']);
    let pnjht = pickRandom(['Dieb', 'Verkehrssünder', 'Bankräuber', 'Taschendieb', 'Korruptionsverdächtiger']);

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
            return conn.sendMessage(m.chat, {
                text: '*Wähle einen Beruf, den du ausüben möchtest*',
                footer: 'by Killua Fourteen',
                buttons: [
                    { buttonId: `.arbeiten dokter`, buttonText: { displayText: 'Arzt [👨‍⚕]' }, type: 1 },
                    { buttonId: `.arbeiten pedagang`, buttonText: { displayText: 'Händler [👨🏻‍🍳]' }, type: 1 },
                    { buttonId: `.arbeiten ojek`, buttonText: { displayText: 'Fahrer [🛵]' }, type: 1 },
                    { buttonId: `.arbeiten kuli`, buttonText: { displayText: 'Bauarbeiter [👷‍♂️]' }, type: 1 },
                    { buttonId: `.arbeiten montir`, buttonText: { displayText: 'Mechaniker [👨‍🔧]' }, type: 1 },
                    { buttonId: `.arbeiten petani`, buttonText: { displayText: 'Bauer [👨‍🌾]' }, type: 1 },
                    { buttonId: `.arbeiten polisi`, buttonText: { displayText: 'Polizist [👮]' }, type: 1 }
                ],
                headerType: 1
            }, { quoted: m });
    }

    await addSaldo(m.sender, hasil, 'Münzen');
    user.balance += hasil;
    user.lastkerja = Date.now();
    await user.save();

    return m.reply(message);
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
