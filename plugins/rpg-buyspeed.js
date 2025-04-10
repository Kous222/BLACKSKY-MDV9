let handler = async (m, {
        conn,
        args
}) => {
        if (!args[0] || isNaN(args[0])) {
                throw '*Example*: .buyspeed 100';
        }

        /*conn.sendMessage(m.chat, {
                react: {
                        text: '✅',
                        key: m.key,
                }
        })*/

        let count = parseInt(args[0]);
        let hrg = 50000;
        let price = count * hrg;
        let users = global.db.data.users;
        let user = users[m.sender];
        if (price > user.Münzen) {
                throw `Entschuldigung, du hast nicht genug Geld, um ${count} Geschwindigkeit zu kaufen. Der Preis für 1 Geschwindigkeit ist ${hrg} Münzen.\n\nBenötigt ${price} Münzen.`;
        }
        user.Münzen -= price;
        user.speed += count;
        conn.reply(m.chat, `Erfolgreich ${count} Geschwindigkeit für ${price} Münzen gekauft.`, m);
}

handler.help = ['buyspeed <Anzahl>', 'kaufen', 'erwerben'];
handler.tags = ['rpg'];
handler.command = /^((buyspeed$|kaufen|erwerben)|kaufen|erwerben)/i;
handler.register = true;
handler.rpg = true;

module.exports = handler;