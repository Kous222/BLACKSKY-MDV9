const fs = require('fs');
const dbPath = './database.json';

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let guildId = user.Gilde;

    if (!guildId) {
        return conn.reply(m.chat, 'Sie muss bergabung mit sebuah Gilde für benutzen Befehl dies.', m);
    }

    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) {
        return conn.reply(m.chat, 'Gilde Sie nicht gefunden in basis data.', m);
    }

    if (Gilde.Besitzer !== m.sender && !Gilde.staff.includes(m.sender)) {
        return conn.reply(m.chat, 'Sie nicht memiliki izin für angreifen Gilde Gegner.', m);
    }

    conn.reply(m.chat, 'Mensuchen Gilde Aktiv 🔎', m);

    setTimeout(async () => {
        let attackedGuildId = getRandomGuildId(guildId); // Fungsi für erhalten id Gilde Gegner in einer Weise acak (nicht termasuk Gilde selbst)
        let attackedGuild = global.db.data.guilds[attackedGuildId];

        if (!attackedGuild) {
            return conn.reply(m.chat, 'Nein gibt Gilde Gegner die/der/das kann diserang wenn dies.', m);
        }

        conn.reply(m.chat, `Finden Gilde Aktiv ${attackedGuild.name}`, m);

        await sleep(getRandomInt(1000, 3000)); // Jeda 1-3 Sekunden

        let itemName = getRandomItemName(); // Fungsi für erhalten name Gegenstand in einer Weise acak

        conn.reply(m.chat, `Mestarten Penyerangan Mengbenutze ${itemName}`, m);

        await sleep(getRandomInt(1000, 5000)); // Jeda 1-5 Sekunden

        conn.reply(m.chat, `${Gilde.name} VS ${attackedGuild.name}`, m);

        await sleep(getRandomInt(60000, 300000)); // Jeda 1-5 menit

        // Simulasi kerusakan und pencurian
        let elixirStolen = Math.floor(attackedGuild.elixir / 2); // Mengambil setengah von eliksir Gegner
        let treasureStolen = Math.floor(attackedGuild.treasure / 2); // Mengambil setengah von Schatz Gegner

        attackedGuild.elixir -= elixirStolen;
        attackedGuild.treasure -= treasureStolen;

        // Update basis data
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));

        let result = Gilde.name === attackedGuild.name ? 'Draw' : (Gilde.elixir > attackedGuild.elixir ? `${Gilde.name} Win` : `${Gilde.name} Lose`);

        conn.reply(m.chat, `${result}:

Mengambil ${elixirStolen} Eliksir - ${treasureStolen} Harta von ${attackedGuild.name}`, m);
    }, 3000); // Jeda 3 Sekunden bevor mensuchen Gilde Gegner
};

// Fungsi für erhalten id Gilde Gegner in einer Weise acak (kecuali Gilde selbst)
function getRandomGuildId(currentGuildId) {
    let guildIds = Object.keys(global.db.data.guilds);
    let filteredGuildIds = guildIds.filter(id => id !== currentGuildId); // filter damit nicht termasuk Gilde selbst
    let randomIndex = getRandomInt(0, filteredGuildIds.length - 1);
    return filteredGuildIds[randomIndex];
}

// Fungsi für erhalten name Gegenstand in einer Weise acak
function getRandomItemName() {
    let items = ['namaitem1', 'namaitem2', 'namaitem3']; // ändern mit name-name Gegenstand die/der/das sesuai
    let randomIndex = getRandomInt(0, items.length - 1);
    return items[randomIndex];
}

// Fungsi für menghasilkan angka acak in rentang bestimmt
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi für memerstellen jeda in zeit bestimmt
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

handler.help = ['attackguild'];
handler.tags = ['rpgG'];
handler.command = /^attackguild$/i;
handler.rpg = true
module.exports = handler;