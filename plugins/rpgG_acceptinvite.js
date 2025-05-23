let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let target = m.mentionedJid[0] || args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, 'Bitte markiere den Benutzer, dessen Einladung du annehmen möchtest.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Gildenbesitzer kann Einladungen annehmen.', m);

    if (!Gilde.waitingRoom.includes(target)) return conn.reply(m.chat, 'Der Benutzer steht nicht auf der Einladungsliste.', m);

    Gilde.members.push(target);
    Gilde.waitingRoom = Gilde.waitingRoom.filter(room => room !== target);

    conn.reply(m.chat, `@${target.split('@')[0]} ist der Gilde *${Gilde.name}* offiziell beigetreten.`, m, { mentions: [target] });
};

handler.help = ['guildinviteacc <@Benutzer>'];
handler.tags = ['rpgG'];
handler.command = /^(guildinviteacc)$/i;
handler.rpg = true;
module.exports = handler;
