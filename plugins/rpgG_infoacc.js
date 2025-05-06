let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let target = m.mentionedJid[0] || args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch nicht in einer Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (Gilde.Besitzer !== userId) return conn.reply(m.chat, 'Nur der Besitzer der Gilde kann die Gildeninformation eines anderen einsehen.', m);

    let targetUser = global.db.data.users[target];
    if (!targetUser || !targetUser.Gilde || targetUser.Gilde !== guildId) return conn.reply(m.chat, 'Dieser Nutzer ist nicht in deiner Gilde.', m);

    let membersList = Gilde.members.map((Mitglied, idx) => `• ${idx + 1}. @${Mitglied.split('@')[0]}`).join('\n');
    let guildInfo = `
Name der Gilde: ${Gilde.name}
Stufe: ${Gilde.Stufe}
Besitzer: @${Gilde.Besitzer.split('@')[0]}
Mitglieder:
${membersList}
Gilden-Exp: ${Gilde.exp} / 1000
Elixier: ${Gilde.eliksir}
Schatz: ${Gilde.Schatz}
Guardian: ${Gilde.guardian || '-'}
Angriff: ${Gilde.attack}
Staff: ${Gilde.staff.length > 0 ? Gilde.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
Warteschlange: ${Gilde.waitingRoom.length > 0 ? Gilde.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-'}
Erstellt am: ${Gilde.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [Gilde.Besitzer, ...Gilde.members] });
};

handler.help = ['guildinfoacc <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildinfoacc)$/i;
handler.rpg = true;
module.exports = handler;
