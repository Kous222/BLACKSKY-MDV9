let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];

    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten. Nutze .joinguild <Gildenname>, um einer Gilde beizutreten, oder erstelle eine neue mit .createguild <Gildenname>.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    let membersList = Gilde.members.map((mitglied, idx) => `• ${idx + 1}. @${mitglied.split('@')[0]}`).join('\n');
    let guildInfo = `
亗 Gildenname: ${Gilde.name}
亗 Stufe: ${Gilde.Stufe}
亗 Besitzer: @${Gilde.Besitzer.split('@')[0]}
亗 Mitglieder:
 - ${membersList}
亗 Gildenerfahrung: ${Gilde.exp} / 1000
亗 Elixiere: ${Gilde.eliksir}
亗 Schatz: ${Gilde.Schatz}
亗 Wächter: ${Gilde.guardian || '-'}
亗 Angriff: ${Gilde.attack}
亗 Mitarbeiter: ${Gilde.staff.length > 0 ? Gilde.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
亗 Warteraum: ${Gilde.waitingRoom.length > 0 ? Gilde.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-' }
亗 Gegründet am: ${Gilde.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [Gilde.Besitzer, ...Gilde.members] });
};

handler.help = ['Gilde'];
handler.tags = ['rpgG'];
handler.command = /^(Gilde)$/i;
handler.rpg = true;
module.exports = handler;
