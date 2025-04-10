let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let guildIndex = parseInt(args[0]) - 1; // Ambil nomor Gilde von argumen

    if (!args[0] || isNaN(guildIndex)) return conn.reply(m.chat, 'Anmeldenkan nomor Gilde die/der/das valid.', m);
    if (user.Gilde) return conn.reply(m.chat, 'Sie bereits bergabung in Gilde.', m);

    let guildKeys = Object.keys(global.db.data.guilds);
    if (guildIndex < 0 || guildIndex >= guildKeys.length) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    let guildName = guildKeys[guildIndex];
    let Gilde = global.db.data.guilds[guildName];

    Gilde.members.push(m.sender);
    user.Gilde = guildName;

    conn.reply(m.chat, `Sie erfolgreich bergabung mit Gilde ${Gilde.name}.`, m);
};

handler.help = ['joinguild <nomor_guild>'];
handler.tags = ['rpgG'];
handler.command = /^(joinguild)$/i;
handler.rpg = true;
module.exports = handler;