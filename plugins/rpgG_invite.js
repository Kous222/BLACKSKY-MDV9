let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let target = m.mentionedJid[0] || args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, `Tag user die/der/das ingin du undang zu Gilde ${Gilde.name}.`, m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur besitzer Gilde die/der/das kann mengundang.', m);

    if (global.db.data.users[target].Gilde === guildId) return conn.reply(m.chat, 'User bereits tergabung in Gilde.', m);

    Gilde.waitingRoom.push(target);
    
    conn.reply(m.chat, `@${target.split('@')[0]} du hat diundang zu Gilde ${Gilde.name}. Silakan warte konfirmasi von besitzer Gilde.`, m, { mentions: [target] });
};

handler.help = ['guildinvite <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildinvite)$/i;
handler.rpg = true;
module.exports = handler;