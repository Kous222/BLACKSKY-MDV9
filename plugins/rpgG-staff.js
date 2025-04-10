const fs = require('fs');
const path = require('path');
let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur besitzer Gilde die/der/das kann konfigurieren staff.', m);

    if (!args[0]) return conn.reply(m.chat, 'Format die/der/das du eingeben salah. Contoh penggunaan: .guildstaff hinzufügen/löschen @user', m);

    let action = args[0].toLowerCase();
    let target = m.mentionedJid[0] || args[1];

    if (!target) return conn.reply(m.chat, 'Tag user die/der/das ingin ditambahkan oder dilöschen von staff.', m);

    if (action === 'hinzufügen') {
        if (Gilde.staff.includes(target)) return conn.reply(m.chat, 'User bereits werden staff.', m);

        Gilde.staff.push(target);
        conn.reply(m.chat, `@${target.split('@')[0]} hat ditambahkan als staff in Gilde ${Gilde.name}.`, m, { mentions: [target] });
    } else if (action === 'löschen') {
        if (!Gilde.staff.includes(target)) return conn.reply(m.chat, 'User nicht gibt in in staff.', m);

        Gilde.staff = Gilde.staff.filter(staff => staff !== target);
        conn.reply(m.chat, `@${target.split('@')[0]} hat dilöschen von staff in Gilde ${Gilde.name}.`, m, { mentions: [target] });
    } else {
        conn.reply(m.chat, 'Format die/der/das du eingeben salah. Contoh penggunaan: .guildstaff hinzufügen/löschen @user', m);
    }

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
};

handler.help = ['guildstaff <hinzufügen/löschen> <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildstaff)$/i;
handler.rpg = true;   
module.exports = handler;