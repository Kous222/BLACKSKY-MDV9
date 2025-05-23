let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Prüfen, ob der Nutzer Gildenbesitzer oder Teil des Personals ist
    if (!isGuildOwner(user) && !isGuildStaff(user)) {
        return conn.reply(m.chat, 'Du hast keine Berechtigung, diese Aktion auszuführen.', m);
    }

    let target = m.mentionedJid[0];
    if (!target) return conn.reply(m.chat, 'Bitte markiere den Benutzer, dessen Beitrittsanfrage du annehmen möchtest.', m);

    let targetUser = global.db.data.users[target];
    if (!targetUser.guildRequest) return conn.reply(m.chat, 'Dieser Benutzer hat keine ausstehende Beitrittsanfrage.', m);

    let guildName = targetUser.guildRequest;
    let Gilde = global.db.data.guilds[guildName];

    Gilde.members.push(target);
    targetUser.Gilde = guildName;
    delete targetUser.guildRequest;

    conn.reply(m.chat, `Die Beitrittsanfrage von @${target.split('@')[0]} wurde angenommen.`, m, { mentions: [target] });
};

handler.help = ['guildaccept @Benutzer'];
handler.tags = ['rpgG'];
handler.command = /^(guildaccept)$/i;
handler.rpg = true;
module.exports = handler;

// Funktion zur Überprüfung, ob der Nutzer Gildenbesitzer ist
function isGuildOwner(user) {
    return user.role === 'Besitzer';
}

// Funktion zur Überprüfung, ob der Nutzer Gildenpersonal ist
function isGuildStaff(user) {
    return user.role === 'staff';
}
