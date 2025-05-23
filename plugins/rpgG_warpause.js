let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur die/der Gildenbesitzer*in kann den Krieg pausieren.', m);

    // Logik zum Pausieren des Kriegs kann hier hinzugefügt werden

    conn.reply(m.chat, 'Der Krieg gegen die gegnerische Gilde wurde pausiert.', m);
};

handler.help = ['guildwarpause'];
handler.tags = ['rpgG'];
handler.command = /^(guildwarpause)$/i;
handler.rpg = true;
module.exports = handler;
