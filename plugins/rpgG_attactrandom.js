const fs = require('fs');
const dbPath = './database.json';

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let guildId = user.Gilde;

    if (!guildId) {
        return conn.reply(m.chat, 'Du musst einer Gilde beitreten, um diesen Befehl zu verwenden.', m);
    }

    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) {
        return conn.reply(m.chat, 'Deine Gilde wurde in der Datenbank nicht gefunden.', m);
    }

    if (Gilde.Besitzer !== m.sender && !Gilde.staff.includes(m.sender)) {
        return conn.reply(m.chat, 'Du hast keine Berechtigung, einen Gildenangriff durchzuführen.', m);
    }

    conn.reply(m.chat, 'Suche nach aktiver Gilde 🔎', m);

    setTimeout(async () => {
        let angegriffeneGildeId = getRandomGuildId(guildId);
        let angegriffeneGilde = global.db.data.guilds[angegriffeneGildeId];

        if (!angegriffeneGilde) {
            return conn.reply(m.chat, 'Es gibt momentan keine angreifbare Gilde.', m);
        }

        conn.reply(m.chat, `Gefundene Zielgilde: *${angegriffeneGilde.name}*`, m);

        await sleep(getRandomInt(1000, 3000));

        let gegenstand = getRandomItemName();

        conn.reply(m.chat, `Angriff wird vorbereitet mit ${gegenstand}...`, m);

        await sleep(getRandomInt(1000, 5000));

        conn.reply(m.chat, `⚔️ *${Gilde.name}* VS *${angegriffeneGilde.name}* ⚔️`, m);

        await sleep(getRandomInt(60000, 300000));

        // Simuliere Schaden und Diebstahl
        let gestohlenerElixier = Math.floor(angegriffeneGilde.elixir / 2);
        let gestohlenerSchatz = Math.floor(angegriffeneGilde.treasure / 2);

        angegriffeneGilde.elixir -= gestohlenerElixier;
        angegriffeneGilde.treasure -= gestohlenerSchatz;

        // Speichere Datenbank
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));

        let ergebnis = Gilde.name === angegriffeneGilde.name
            ? 'Unentschieden'
            : (Gilde.elixir > angegriffeneGilde.elixir ? `${Gilde.name} hat gewonnen!` : `${Gilde.name} hat verloren.`);

        conn.reply(m.chat, `${ergebnis}

Erbeutet:
- ${gestohlenerElixier} Elixier
- ${gestohlenerSchatz} Schatz
von *${angegriffeneGilde.name}*`, m);
    }, 3000);
};

function getRandomGuildId(currentGuildId) {
    let guildIds = Object.keys(global.db.data.guilds);
    let filteredGuildIds = guildIds.filter(id => id !== currentGuildId);
    let randomIndex = getRandomInt(0, filteredGuildIds.length - 1);
    return filteredGuildIds[randomIndex];
}

function getRandomItemName() {
    let items = ['Feuerkugel', 'Donnerschlag', 'Magisches Schwert'];
    let randomIndex = getRandomInt(0, items.length - 1);
    return items[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

handler.help = ['attackguild'];
handler.tags = ['rpgG'];
handler.command = /^attackguild$/i;
handler.rpg = true;
module.exports = handler;
