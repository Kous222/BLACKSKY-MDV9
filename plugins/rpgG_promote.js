let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur besitzer Gilde die/der/das kann mempromosikan mitglied.', m);

    let target = m.mentionedJid[0] || args[0];

    if (!target) return conn.reply(m.chat, 'Tag user die/der/das ingin du promosikan.', m);

    if (Gilde.staff.includes(target)) return conn.reply(m.chat, 'User bereits werden staff.', m);

    Gilde.staff.push(target);

    conn.reply(m.chat, `@${target.split('@')[0]} hat dipromosikan werden staff in Gilde ${Gilde.name}.`, m, { mentions: [target] });
};

handler.help = ['guildpromote <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildpromote)$/i;
handler.rpg = true;
module.exports = handler;