const fs = require('fs');
const dbPath = './database.json'; // Path zu database file

let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];

    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde Welche auch.', m);

    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) return conn.reply(m.chat, 'Nein gibt Gilde die/der/das verfügbar für dilöschen.', m);

    let guildList = guilds.map((Gilde, index) => `${index + 1}. ${Gilde.name}`).join('\n');
    let responseText = `Wählen Gilde die/der/das ingin dilöschen mit mengetik nomor Gilde:\n\n${guildList}`;

    if (args.length < 1) return conn.reply(m.chat, responseText, m);

    let guildIndex = parseInt(args[0]) - 1;

    if (isNaN(guildIndex) || guildIndex < 0 || guildIndex >= guilds.length) {
        return conn.reply(m.chat, 'Nomor Gilde nicht valid.', m);
    }

    let selectedGuild = guilds[guildIndex];

    if (selectedGuild.Besitzer !== userId) return conn.reply(m.chat, 'Nur Besitzer Gilde die/der/das kann menglöschen Gilde.', m);

    // delete Gilde von database
    delete global.db.data.guilds[selectedGuild.name];

    // delete referensi Gilde von jede mitglied
    selectedGuild.members.forEach(memberId => {
        if (global.db.data.users[memberId]) {
            global.db.data.users[memberId].Gilde = null;
        }
    });

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));

    conn.reply(m.chat, `Gilde ${selectedGuild.name} erfolgreich dilöschen.`, m);
};

handler.help = ['delguild <nomor_guild>'];
handler.tags = ['rpgG'];
handler.command = /^(delguild)$/i;
handler.Besitzer = false;
handler.rpg = true
module.exports = handler;