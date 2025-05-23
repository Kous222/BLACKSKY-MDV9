let handler = async (m, { conn }) => {
    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) {
        return conn.reply(m.chat, 'Es gibt noch keine Gilden, die registriert sind.', m);
    }

    let guildList = guilds.map((Gilde, idx) => `${idx + 1}. ${Gilde.name} mit ${Gilde.members.length} Mitgliedern`).join('\n');

    conn.reply(m.chat, `亗 ÖFFENTLICHE GILDEN 亗\n${guildList}`, m);
};

handler.help = ['guildlist'];
handler.tags = ['rpgG'];
handler.command = /^(guildlist)$/i;
handler.rpg = true;
module.exports = handler;
