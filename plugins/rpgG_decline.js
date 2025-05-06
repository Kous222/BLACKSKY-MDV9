let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer === userId) return conn.reply(m.chat, 'Der Gildenbesitzer kann keine Beitrittsanfragen ablehnen.', m);

    Gilde.waitingRoom = Gilde.waitingRoom.filter(room => room !== userId);

    conn.reply(m.chat, 'Deine Beitrittsanfrage zur Gilde wurde abgelehnt.', m);
};

handler.help = ['guilddecline'];
handler.tags = ['rpgG'];
handler.command = /^(guilddecline)$/i;
handler.rpg = true;
module.exports = handler;
