let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch nicht in einer Gilde.', m);

    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) {
        return conn.reply(m.chat, 'Es gibt noch keine Gilden, die registriert sind.', m);
    }

    let guildList = guilds.map((Gilde, idx) => `${idx + 1}. ${Gilde.name} (${Gilde.members.length} Mitglieder)`).join('\n');

    conn.reply(m.chat, `Registrierte Gilden:\n${guildList}`, m);
};

handler.help = ['guildlistacc'];
handler.tags = ['rpgG'];
handler.command = /^(guildlistacc)$/i;
handler.rpg = true;
module.exports = handler;
