let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch nicht in einer Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    let membersList = Gilde.members.map((Mitglied, idx) => `• ${idx + 1}. @${Mitglied.split('@')[0]}`).join('\n');
    let guildInfo = `
Name der Gilde: ${Gilde.name}
Stufe: ${Gilde.Stufe}
Besitzer: @${Gilde.Besitzer.split('@')[0]}
Mitglieder:
${membersList}
Erfahrung der Gilde: ${Gilde.exp} / 1000
Elixier: ${Gilde.eliksir}
Schatz: ${Gilde.Schatz}
Guardian: ${Gilde.guardian || '-'}
Angriff: ${Gilde.attack}
Mitarbeiter: ${Gilde.staff.length > 0 ? Gilde.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
Warteschlange: ${Gilde.waitingRoom.length > 0 ? Gilde.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-'}
Erstellt am: ${Gilde.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [Gilde.Besitzer, ...Gilde.members] });
};

handler.help = ['myguild'];
handler.tags = ['rpgG'];
handler.command = /^(myguild)$/i;
handler.rpg = true;  
module.exports = handler;
