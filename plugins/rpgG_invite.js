let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let target = m.mentionedJid[0] || args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch nicht in einer Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!args[0]) return conn.reply(m.chat, `Tagge den Nutzer, den du in die Gilde ${Gilde.name} einladen möchtest.`, m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Besitzer der Gilde kann Einladungen verschicken.', m);

    if (global.db.data.users[target].Gilde === guildId) return conn.reply(m.chat, 'Dieser Nutzer ist bereits in der Gilde beigetreten.', m);

    Gilde.waitingRoom.push(target);
    
    conn.reply(m.chat, `@${target.split('@')[0]} wurde in die Gilde ${Gilde.name} eingeladen. Bitte warte auf eine Bestätigung vom Gildenbesitzer.`, m, { mentions: [target] });
};

handler.help = ['guildinvite <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildinvite)$/i;
handler.rpg = true;
module.exports = handler;
