let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let guildIndex = parseInt(args[0]) - 1; // Holen Sie sich die Gilden-Nummer von den Argumenten

    if (!args[0] || isNaN(guildIndex)) return conn.reply(m.chat, 'Bitte gib eine gültige Gilden-Nummer ein.', m);
    if (user.Gilde) return conn.reply(m.chat, 'Du bist bereits einer Gilde beigetreten.', m);

    let guildKeys = Object.keys(global.db.data.guilds);
    if (guildIndex < 0 || guildIndex >= guildKeys.length) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    let guildName = guildKeys[guildIndex];
    let Gilde = global.db.data.guilds[guildName];

    Gilde.members.push(m.sender);
    user.Gilde = guildName;

    conn.reply(m.chat, `Du bist erfolgreich der Gilde ${Gilde.name} beigetreten.`, m);
};

handler.help = ['joinguild <guild_nummer>'];
handler.tags = ['rpgG'];
handler.command = /^(joinguild)$/i;
handler.rpg = true;
module.exports = handler;
