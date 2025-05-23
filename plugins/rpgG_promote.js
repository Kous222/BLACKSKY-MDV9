let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch nicht in einer Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Besitzer der Gilde kann Mitglieder befördern.', m);

    let target = m.mentionedJid[0] || args[0];

    if (!target) return conn.reply(m.chat, 'Tagge den Benutzer, den du befördern möchtest.', m);

    if (Gilde.staff.includes(target)) return conn.reply(m.chat, 'Dieser Benutzer ist bereits ein Mitarbeiter.', m);

    Gilde.staff.push(target);

    conn.reply(m.chat, `@${target.split('@')[0]} wurde zu einem Mitarbeiter in der Gilde ${Gilde.name} befördert.`, m, { mentions: [target] });
};

handler.help = ['guildpromote <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildpromote)$/i;
handler.rpg = true;
module.exports = handler;
