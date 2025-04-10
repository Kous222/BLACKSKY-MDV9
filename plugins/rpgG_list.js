let handler = async (m, { conn }) => {
    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) {
        return conn.reply(m.chat, 'Belum gibt Gilde die/der/das registriert.', m);
    }

    let guildList = guilds.map((Gilde, idx) => `${idx + 1}. ${Gilde.name} ${Gilde.members.length} Member`).join('\n');

    conn.reply(m.chat, `亗 PUBLIC GILDE 亗\n${guildList}`, m);
};

handler.help = ['guildlist'];
handler.tags = ['rpgG'];
handler.command = /^(guildlist)$/i;
handler.rpg = true;
module.exports = handler;