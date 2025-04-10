let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, 'Anmeldenkan Gilde Gegner die/der/das ingin diwar.', m);

    let enemyGuildName = args.join(' ');
    let enemyGuild = Object.values(global.db.data.guilds).find(Gilde => Gilde.name === enemyGuildName);
    if (!enemyGuild) return conn.reply(m.chat, 'Gilde Gegner nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur besitzer Gilde die/der/das kann mestarten perang.', m);

    // Logika perang kann ditambahkan in hier

    conn.reply(m.chat, `Kampf mit Gilde ${enemyGuild.name} in pengembangan.`, m);
};

handler.help = ['guildwaracc <nama_guild>'];
handler.tags = ['rpgG'];
handler.command = /^(guildwaracc)$/i;
handler.rpg = true;
module.exports = handler;