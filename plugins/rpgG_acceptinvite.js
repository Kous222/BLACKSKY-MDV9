let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let target = m.mentionedJid[0] || args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, 'Tag user die/der/das ingin du empfangen undangannya zu Gilde.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur besitzer Gilde die/der/das kann akzeptieren undangan.', m);

    if (!Gilde.waitingRoom.includes(target)) return conn.reply(m.chat, 'User nicht gibt in in Liste undangan.', m);

    Gilde.members.push(target);
    Gilde.waitingRoom = Gilde.waitingRoom.filter(room => room !== target);

    conn.reply(m.chat, `@${target.split('@')[0]} hat resmi bergabung mit Gilde ${Gilde.name}.`, m, { mentions: [target] });
};

handler.help = ['guildinviteacc <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildinviteacc)$/i;
handler.rpg = true
module.exports = handler;