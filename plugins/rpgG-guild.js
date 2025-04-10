let handler = async (m) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];

    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde. Gunakan .joinguild <nama_guild> für bergabung zu Gilde oder erstellen Gilde neu mit .createguild <nama_guild>.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    let membersList = Gilde.members.map((Mitglied, idx) => `• ${idx + 1}. @${Mitglied.split('@')[0]}`).join('\n');
    let guildInfo = `
亗 Name Gilde: ${Gilde.name}
亗 Stufe: ${Gilde.Stufe}
亗 Besitzer: @${Gilde.Besitzer.split('@')[0]}
亗 Mitglied:
 - ${membersList}
亗 Eksperience Gilde: ${Gilde.exp} / 1000
亗 Eliksir: ${Gilde.eliksir}
亗 Harta: ${Gilde.Schatz}
亗 Guardian: ${Gilde.guardian || '-'}
亗 Attack: ${Gilde.attack}
亗 Staff: ${Gilde.staff.length > 0 ? Gilde.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
亗 Waiting Room: ${Gilde.waitingRoom.length > 0 ? Gilde.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-' }
亗 Building Made: ${Gilde.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [Gilde.Besitzer, ...Gilde.members] });
};

handler.help = ['Gilde'];
handler.tags = ['rpgG'];
handler.command = /^(Gilde)$/i;
handler.rpg = true;
module.exports = handler;