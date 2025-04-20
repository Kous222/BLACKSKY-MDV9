let fs = require('fs')

let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let upgradeType = args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'Du bist noch keiner Gilde beigetreten.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde wurde nicht gefunden.', m);

    if (!upgradeType) return conn.reply(m.chat, 'Bitte wähle eine gültige Art der Verbesserung: *Stufe*, *Elixier*, *Schatz*, *Wächter*, *Angriff*.', m);

    switch (upgradeType.toLowerCase()) {
        case 'stufe':
            if (user.Münzen < 5000000000) return conn.reply(m.chat, 'Du hast nicht genug Münzen, um die Stufe der Gilde zu verbessern. Erforderlich: 5.000.000.000 Münzen.', m);

            Gilde.Stufe++;
            user.Münzen -= 5000000000;
            conn.reply(m.chat, `Die Stufe der Gilde *${Gilde.name}* wurde auf ${Gilde.Stufe} erhöht.`, m);
            break;
        case 'elixier':
            if (user.Münzen < 1000000000) return conn.reply(m.chat, 'Du hast nicht genug Münzen, um das Elixier der Gilde zu verbessern. Erforderlich: 1.000.000.000 Münzen.', m);

            Gilde.eliksir++;
            user.Münzen -= 1000000000;
            conn.reply(m.chat, `Das Elixier der Gilde *${Gilde.name}* wurde auf ${Gilde.eliksir} erhöht.`, m);
            break;
        case 'schatz':
            if (user.Münzen < 2000000000) return conn.reply(m.chat, 'Du hast nicht genug Münzen, um den Schatz der Gilde zu verbessern. Erforderlich: 2.000.000.000 Münzen.', m);

            Gilde.Schatz++;
            user.Münzen -= 2000000000;
            conn.reply(m.chat, `Der Schatz der Gilde *${Gilde.name}* wurde auf ${Gilde.Schatz} erhöht.`, m);
            break;
        case 'wächter':
            if (user.Münzen < 3000000000) return conn.reply(m.chat, 'Du hast nicht genug Münzen, um den Wächter der Gilde zu verbessern. Erforderlich: 3.000.000.000 Münzen.', m);

            Gilde.guardian++;
            user.Münzen -= 3000000000;
            conn.reply(m.chat, `Der Wächter der Gilde *${Gilde.name}* wurde auf ${Gilde.guardian} erhöht.`, m);
            break;
        case 'angriff':
            if (user.Münzen < 4000000000) return conn.reply(m.chat, 'Du hast nicht genug Münzen, um den Angriff der Gilde zu verbessern. Erforderlich: 4.000.000.000 Münzen.', m);

            Gilde.attack++;
            user.Münzen -= 4000000000;
            conn.reply(m.chat, `Der Angriff der Gilde *${Gilde.name}* wurde auf ${Gilde.attack} erhöht.`, m);
            break;
        default:
            conn.reply(m.chat, 'Ungültige Verbesserung. Wähle eine von: *Stufe*, *Elixier*, *Schatz*, *Wächter*, *Angriff*.', m);
            break;
    }

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
};

handler.help = ['guildupgrade <Stufe/Elixier/Schatz/Wächter/Angriff>'];
handler.tags = ['rpgG'];
handler.command = /^(guildupgrade)$/i;
handler.rpg = true;
module.exports = handler;