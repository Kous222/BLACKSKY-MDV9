let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, 'Bitte gib den Namen der gegnerischen Gilde an, gegen die du kämpfen möchtest.', m);

    let enemyGuildName = args.join(' ');
    let enemyGuild = Object.values(global.db.data.guilds).find(Gilde => Gilde.name === enemyGuildName);
    if (!enemyGuild) return conn.reply(m.chat, 'Gegnerische Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Besitzer der Gilde kann den Krieg starten.', m);

    // Kriegslogik kann hier hinzugefügt werden

    conn.reply(m.chat, `Der Krieg gegen die Gilde "${enemyGuild.name}" befindet sich in Entwicklung.`, m);
};

handler.help = ['guildwaracc <gildenname>'];
handler.tags = ['rpgG'];
handler.command = /^(guildwaracc)$/i;
handler.rpg = true;
module.exports = handler;
