let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Besitzer der Gilde kann Mitglieder degradieren.', m);

    let target = m.mentionedJid[0] || args[0];

    if (!target) return conn.reply(m.chat, 'Markiere den Benutzer, dessen Rang du herabsetzen möchtest.', m);

    if (!Gilde.staff.includes(target)) return conn.reply(m.chat, 'Der Benutzer ist nicht im Staff.', m);

    Gilde.staff = Gilde.staff.filter(staff => staff !== target);

    conn.reply(m.chat, `@${target.split('@')[0]} wurde in der Gilde ${Gilde.name} degradiert.`, m, { mentions: [target] });
};

handler.help = ['guilddemote <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guilddemote)$/i;
handler.rpg = true;
module.exports = handler;
