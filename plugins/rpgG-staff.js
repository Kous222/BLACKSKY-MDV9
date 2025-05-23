const fs = require('fs');
const path = require('path');
let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der/die Gildenbesitzer*in kann das Personal verwalten.', m);

    if (!args[0]) return conn.reply(m.chat, 'Ungültiges Format. Beispiel: .guildstaff hinzufügen/löschen @Benutzer', m);

    let action = args[0].toLowerCase();
    let target = m.mentionedJid[0] || args[1];

    if (!target) return conn.reply(m.chat, 'Bitte markiere den Benutzer, der hinzugefügt oder entfernt werden soll.', m);

    if (action === 'hinzufügen') {
        if (Gilde.staff.includes(target)) return conn.reply(m.chat, 'Der Benutzer ist bereits im Personal.', m);

        Gilde.staff.push(target);
        conn.reply(m.chat, `@${target.split('@')[0]} wurde dem Personal der Gilde *${Gilde.name}* hinzugefügt.`, m, { mentions: [target] });
    } else if (action === 'löschen') {
        if (!Gilde.staff.includes(target)) return conn.reply(m.chat, 'Der Benutzer ist nicht im Personal.', m);

        Gilde.staff = Gilde.staff.filter(staff => staff !== target);
        conn.reply(m.chat, `@${target.split('@')[0]} wurde aus dem Personal der Gilde *${Gilde.name}* entfernt.`, m, { mentions: [target] });
    } else {
        conn.reply(m.chat, 'Ungültiges Format. Beispiel: .guildstaff hinzufügen/löschen @Benutzer', m);
    }

    fs.writeFileSync(path.join(__dirname, '../lib/database.json'), JSON.stringify(global.db.data, null, 2));
};

handler.help = ['guildstaff <hinzufügen/löschen> <@Benutzer>'];
handler.tags = ['rpgG'];
handler.command = /^(guildstaff)$/i;
handler.rpg = true;   
module.exports = handler;
