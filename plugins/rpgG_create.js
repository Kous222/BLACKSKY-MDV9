const fs = require('fs');
const dbPath = './database.json'; // Pfad zur Datenbankdatei

let handler = async (m, { conn, args }) => {
    if (args.length < 1) return conn.reply(m.chat, 'Benutzung: .createguild <Gildenname>', m);
    
    let userId = m.sender;
    let guildName = args.join(' ');

    // Überprüfen, ob der Benutzer genug Münzen hat, um eine Gilde zu erstellen
    let user = global.db.data.users[userId];
    if (!user) return conn.reply(m.chat, 'Du bist noch nicht in der Datenbank registriert.', m);
    
    if (user.Münzen < 20000000000) {
        return conn.reply(m.chat, 'Du hast nicht genug Münzen, um eine Gilde zu erstellen. Du benötigst 20.000.000.000 Münzen.', m);
    }

    // Nutzer initialisieren, falls noch nicht vorhanden
    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            Gilde: null,
            Münzen: 0,
            exp: 0,
            gilden_exp: 0,
        };
    }
    
    if (user.Gilde) return conn.reply(m.chat, 'Du bist bereits Mitglied einer Gilde.', m);
    
    let guildId = 'gilde_' + new Date().getTime(); // Erstellen einer eindeutigen Gilden-ID
    if (!global.db.data.guilds) global.db.data.guilds = {};
    if (!global.db.data.guilds[guildId]) {
        global.db.data.guilds[guildId] = {
            name: guildName,
            Besitzer: userId,
            members: [userId],
            createdAt: new Date().toISOString(),
            Stufe: 1,
            exp: 0,
            eliksir: 0,
            Schatz: 0,
            guardian: null,
            attack: 0,
            staff: [],
            waitingRoom: [],
        };
        user.Gilde = guildId;
        user.Münzen -= 20000000000; // Münzen abziehen
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
        conn.reply(m.chat, `Gilde *${guildName}* wurde erfolgreich erstellt!`, m);
    } else {
        conn.reply(m.chat, 'Ein Fehler ist beim Erstellen der Gilde aufgetreten. Bitte versuche es erneut.', m);
    }
};

handler.help = ['createguild <Gildenname>'];
handler.tags = ['rpgG'];
handler.command = /^(createguild)$/i;
handler.Besitzer = false;
handler.rpg = true;
module.exports = handler;
