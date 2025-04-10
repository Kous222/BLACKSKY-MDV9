let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur besitzer Gilde die/der/das kann menghentikan perang.', m);

    // Logika für menghentikan perang kann ditambahkan in hier

    conn.reply(m.chat, 'Kampf mit Gilde Gegner gerade dihentikan.', m);
};

handler.help = ['guildwarpause'];
handler.tags = ['rpgG'];
handler.command = /^(guildwarpause)$/i;
handler.rpg = true;
module.exports = handler;