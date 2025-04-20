let handler = async (m, { conn, participants }) => {
    if (!m.isGroup) throw '❌ Dieser Befehl kann nur in Gruppen verwendet werden.';

    // Filtere alle Teilnehmer außer dem Bot
    let members = participants.filter(p => p.id !== conn.user.jid).map(p => p.id);

    if (members.length < 3) throw '⚠️ Es müssen mindestens 3 Teilnehmer in der Gruppe sein, um ein Sandwich zu bauen.';

    // Mische Teilnehmer zufällig
    let [top, middle, bottom] = members.sort(() => 0.5 - Math.random()).slice(0, 3);

    let topTag = '@' + top.split('@')[0];
    let middleTag = '@' + middle.split('@')[0];
    let bottomTag = '@' + bottom.split('@')[0];

    let text = `
╭━━━[ 🥪 *SANDWICH TIME* 🥪 ]━━━⬣
┃ 🍞 *Obere Scheibe:* ${topTag}
┃ 🧀 *Füllung:* ${middleTag}
┃ 🍞 *Untere Scheibe:* ${bottomTag}
╰━━━━━━━━━━━━━━━━━━━━━━⬣

*Drei Zutaten – ein heißes Gruppen-Sandwich!*
`;

    await conn.sendMessage(m.chat, { text: text.trim(), mentions: [top, middle, bottom] });
};

handler.help = ['sandwich'];
handler.tags = ['fun'];
handler.command = ['sandwich'];
handler.group = true;
handler.rpg = false;

module.exports = handler;
