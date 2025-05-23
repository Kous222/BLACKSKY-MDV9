const fs = require('fs');
const dbPath = './database.json'; // Pfad zur Datenbankdatei

let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];

    if (!user.Gilde) return conn.reply(m.chat, 'Du bist keiner Gilde beigetreten.', m);

    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) return conn.reply(m.chat, 'Es gibt keine Gilden, die gelöscht werden können.', m);

    let guildList = guilds.map((Gilde, index) => `${index + 1}. ${Gilde.name}`).join('\n');
    let responseText = `Wähle die Gilde, die du löschen möchtest, indem du die Nummer der Gilde eingibst:\n\n${guildList}`;

    if (args.length < 1) return conn.reply(m.chat, responseText, m);

    let guildIndex = parseInt(args[0]) - 1;

    if (isNaN(guildIndex) || guildIndex < 0 || guildIndex >= guilds.length) {
        return conn.reply(m.chat, 'Ungültige Gilden-Nummer.', m);
    }

    let selectedGuild = guilds[guildIndex];

    if (selectedGuild.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Gildenbesitzer kann die Gilde löschen.', m);

    // Lösche Gilde aus der Datenbank
    delete global.db.data.guilds[selectedGuild.name];

    // Lösche Gildenreferenzen für alle Mitglieder
    selectedGuild.members.forEach(memberId => {
        if (global.db.data.users[memberId]) {
            global.db.data.users[memberId].Gilde = null;
        }
    });

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));

    conn.reply(m.chat, `Die Gilde ${selectedGuild.name} wurde erfolgreich gelöscht.`, m);
};

handler.help = ['delguild <gilden_nummer>'];
handler.tags = ['rpgG'];
handler.command = /^(delguild)$/i;
handler.Besitzer = false;
handler.rpg = true;
module.exports = handler;
