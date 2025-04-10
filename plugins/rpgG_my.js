let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    let membersList = Gilde.members.map((Mitglied, idx) => `• ${idx + 1}. @${Mitglied.split('@')[0]}`).join('\n');
    let guildInfo = `
Name Gilde: ${Gilde.name}
Stufe: ${Gilde.Stufe}
Besitzer: @${Gilde.Besitzer.split('@')[0]}
Mitglied:
${membersList}
Eksperience Gilde: ${Gilde.exp} / 1000
Eliksir: ${Gilde.eliksir}
Harta: ${Gilde.Schatz}
Guardian: ${Gilde.guardian || '-'}
Attack: ${Gilde.attack}
Staff: ${Gilde.staff.length > 0 ? Gilde.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
Waiting Room: ${Gilde.waitingRoom.length > 0 ? Gilde.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-' }
Dierstellen Auf: ${Gilde.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [Gilde.Besitzer, ...Gilde.members] });
};

handler.help = ['myguild'];
handler.tags = ['rpgG'];
handler.command = /^(myguild)$/i;
handler.rpg = true;  
module.exports = handler;