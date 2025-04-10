let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Cek ob Nutzer ist besitzer Gilde oder memiliki peran staff
    if (!isGuildOwner(user) && !isGuildStaff(user)) {
        return conn.reply(m.chat, 'Sie nicht memiliki izin für durchführen dies.', m);
    }

    let target = m.mentionedJid[0];
    if (!target) return conn.reply(m.chat, 'Tag user die/der/das ingin Sie empfangen in Gilde.', m);

    let targetUser = global.db.data.users[target];
    if (!targetUser.guildRequest) return conn.reply(m.chat, 'Nein gibt permintaan bergabung die/der/das tertunda von Nutzer dies.', m);

    let guildName = targetUser.guildRequest;
    let Gilde = global.db.data.guilds[guildName];

    Gilde.members.push(target);
    targetUser.Gilde = guildName;
    delete targetUser.guildRequest;

    conn.reply(m.chat, `Permintaan bergabung von @${target.split('@')[0]} hat akzeptiert.`, m);
};

handler.help = ['guildaccept @user'];
handler.tags = ['rpgG'];
handler.command = /^(guildaccept)$/i;
handler.rpg = true;
module.exports = handler;


// Fungsi für mengecek ob Nutzer ist besitzer Gilde
function isGuildOwner(user) {
    // Implementasi logika für mengecek ob user ist besitzer Gilde
    return user.role === 'Besitzer'; // Misalnya, wenn role 'Besitzer' menunjukkan besitzer Gilde
}

// Fungsi für mengecek ob Nutzer memiliki peran staff in Gilde
function isGuildStaff(user) {
    // Implementasi logika für mengecek ob user memiliki peran staff in Gilde
    return user.role === 'staff'; // Misalnya, wenn role 'staff' menunjukkan staff Gilde
}