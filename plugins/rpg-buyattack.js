let handler = async (m, {
        conn,
        args
}) => {
        if (!args[0] || isNaN(args[0])) {
                throw '*Example*: .buyattack 100';
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
                throw `Entschuldigung, du hast nicht genug Geld, um ${count} Angriff zu kaufen. Der Preis für 1 Angriff ist ${hrg} Münzen.\n\nBenötigt ${price} Münzen.`;
        }
        user.Münzen -= price;
        user.attack += count;
        conn.reply(m.chat, `Erfolgreich ${count} Angriff für ${price} Münzen gekauft.`, m);
}

handler.help = ['buyattack <Anzahl>', 'kaufen', 'erwerben'];
handler.tags = ['rpg'];
handler.command = /^((buyattack$|kaufen|erwerben)|kaufen|erwerben)/i;
handler.rpg = true;
handler.register = true;

module.exports = handler;