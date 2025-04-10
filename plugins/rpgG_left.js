let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    Gilde.members = Gilde.members.filter(Mitglied => Mitglied !== userId);
    user.Gilde = null;

    conn.reply(m.chat, 'du hat ausgehen von Gilde.', m);
};

handler.help = ['guildleave'];
handler.tags = ['rpgG'];
handler.command = /^(guildleave)$/i;
handler.rpg = true;
module.exports = handler;