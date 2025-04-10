let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let upgradeType = args[0];

    if (!user.Gilde) return conn.reply(m.chat, 'du noch nicht tergabung in Gilde.', m);

    let guildId = user.Gilde;
    let Gilde = global.db.data.guilds[guildId];
    if (!Gilde) return conn.reply(m.chat, 'Gilde nicht gefunden.', m);

    if (!upgradeType) return conn.reply(m.chat, 'Wählen jenis verbessern die/der/das ingin du lakukan (Stufe, eliksir, Schatz, guardian, attack).', m);

    switch (upgradeType.toLowerCase()) {
        case 'Stufe':
            if (user.Münzen < 5000000000) return conn.reply(m.chat, 'du nicht memiliki genug Münzen für verbessern Stufe Gilde. Butuh 5.000.000.000 Münzen.', m);

            Gilde.Stufe++;
            user.Münzen -= 5000000000;
            conn.reply(m.chat, `Stufe Gilde ${Gilde.name} hat ditingkatkan werden ${Gilde.Stufe}.`, m);
            break;
        case 'eliksir':
            if (user.Münzen < 1000000000) return conn.reply(m.chat, 'du nicht memiliki genug Münzen für verbessern eliksir Gilde. Butuh 1.000.000.000 Münzen.', m);

            Gilde.eliksir++;
            user.Münzen -= 1000000000;
            conn.reply(m.chat, `Eliksir Gilde ${Gilde.name} hat ditingkatkan werden ${Gilde.eliksir}.`, m);
            break;
        case 'Schatz':
            if (user.Münzen < 2000000000) return conn.reply(m.chat, 'du nicht memiliki genug Münzen für verbessern Schatz Gilde. Butuh 2.000.000.000 Münzen.', m);

            Gilde.Schatz++;
            user.Münzen -= 2000000000;
            conn.reply(m.chat, `Harta Gilde ${Gilde.name} hat ditingkatkan werden ${Gilde.Schatz}.`, m);
            break;
        case 'guardian':
            if (user.Münzen < 3000000000) return conn.reply(m.chat, 'du nicht memiliki genug Münzen für verbessern guardian Gilde. Butuh 3.000.000.000 Münzen.', m);

            Gilde.guardian++;
            user.Münzen -= 3000000000;
            conn.reply(m.chat, `Guardian Gilde ${Gilde.name} hat ditingkatkan werden ${Gilde.guardian}.`, m);
            break;
        case 'attack':
            if (user.Münzen < 4000000000) return conn.reply(m.chat, 'du nicht memiliki genug Münzen für verbessern attack Gilde. Butuh 4.000.000.000 Münzen.', m);

            Gilde.attack++;
            user.Münzen -= 4000000000;
            conn.reply(m.chat, `Attack Gilde ${Gilde.name} hat ditingkatkan werden ${Gilde.attack}.`, m);
            break;
        default:
            conn.reply(m.chat, 'Wählen jenis verbessern die/der/das valid: Stufe, eliksir, Schatz, guardian, attack.', m);
            break;
    }

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
};

handler.help = ['guildupgrade <Stufe/eliksir/Schatz/guardian/attack>'];
handler.tags = ['rpgG'];
handler.command = /^(guildupgrade)$/i;
handler.rpg = true;
module.exports = handler;