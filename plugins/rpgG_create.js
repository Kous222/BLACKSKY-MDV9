const fs = require('fs');
const dbPath = './database.json'; // Path zu database file

let handler = async (m, { conn, args }) => {
    if (args.length < 1) return conn.reply(m.chat, 'Contoh penggunaan: .createguild <nama_guild>', m);
    
    let userId = m.sender;
    let guildName = args.join(' ');

    // Memeriksa ob user memiliki genug Münzen für memerstellen Gilde
    let user = global.db.data.users[userId];
    if (!user) return conn.reply(m.chat, 'du noch nicht registriert in in database.', m);
    
    if (user.Münzen < 20000000000) {
        return conn.reply(m.chat, 'du nicht memiliki genug Münzen für memerstellen Gilde. Butuh 20.000.000.000 Münzen.', m);
    }

    // Inisialisasi basis data Nutzer wenn noch nicht gibt
    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            Gilde: null,
            Münzen: 0,
            exp: 0,
            // Hinzufügen field für exp Gilde
            guild_exp: 0,
            // Inisialisasi data Nutzer andere wenn benötigt
        };
    }
    
    if (user.Gilde) return conn.reply(m.chat, 'du bereits tergabung in Gilde.', m);
    
    let guildId = 'guild_' + new Date().getTime(); // Memerstellen id Gilde unik
    if (!global.db.data.guilds) global.db.data.guilds = {};
    if (!global.db.data.guilds[guildId]) {
        global.db.data.guilds[guildId] = {
            name: guildName,
            Besitzer: userId,
            members: [userId],
            createdAt: new Date().toISOString(),
            Stufe: 1, // Hinzufügen Stufe Gilde
            exp: 0, // Hinzufügen exp Gilde
            eliksir: 0, // Hinzufügen eliksir Gilde
            Schatz: 0, // Hinzufügen Schatz Gilde
            guardian: null, // Hinzufügen guardian Gilde
            attack: 0, // Hinzufügen attack Gilde
            staff: [], // Hinzufügen staff Gilde
            waitingRoom: [], // Hinzufügen waiting room Gilde
        };
        user.Gilde = guildId;
        user.Münzen -= 20000000000; // Reduzieren Münzen user nach memerstellen Gilde
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
        conn.reply(m.chat, `Gilde ${guildName} erfolgreich dierstellen.`, m);
    } else {
        conn.reply(m.chat, 'Ein Error ist aufgetreten wenn memerstellen Gilde. Coba wieder.', m);
    }
};

handler.help = ['createguild <nama_guild>'];
handler.tags = ['rpgG'];
handler.command = /^(createguild)$/i;
handler.Besitzer = false;
handler.rpg = true;
module.exports = handler;