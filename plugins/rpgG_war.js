let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, 'Bitte gib den Namen der feindlichen Gilde an, die du angreifen möchtest.', m);

    let enemyGuildName = args.join(' ');
    let enemyGuild = Object.values(global.db.data.guilds).find(Gilde => Gilde.name === enemyGuildName);
    if (!enemyGuild) return conn.reply(m.chat, 'Feindliche Gilde nicht gefunden.', m);

    // Kampflogik kann hier hinzugefügt werden

    conn.reply(m.chat, `Der Kampf gegen die Gilde "${enemyGuild.name}" befindet sich derzeit in Entwicklung.`, m);
};

handler.help = ['guildwar <gildenname>'];
handler.tags = ['rpgG'];
handler.command = /^(guildwar)$/i;
handler.rpg = true;
module.exports = handler;
