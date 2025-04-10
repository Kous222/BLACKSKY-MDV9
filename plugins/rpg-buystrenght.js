let handler = async (m, {
        conn,
        args
}) => {
        if (!args[0] || isNaN(args[0])) {
                throw '*Beispiel*: .kraftkaufen 100';
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
                throw `Entschuldigung, du hast nicht genug Geld, um ${count} Stärke zu kaufen. Der Preis für 1 Stärke ist ${hrg} Münzen.\n\nBenötigt ${price} Münzen.`;
        }
        user.Münzen -= price;
        user.stärke += count;
        conn.reply(m.chat, `Erfolgreich ${count} Stärke für ${price} Münzen gekauft.`, m);
}

handler.help = ['kraftkaufen <Anzahl>', 'stärkekaufen', 'krafterwerben'];
handler.tags = ['rpg'];
handler.command = /^((kraftkaufen|stärkekaufen|krafterwerben)|kaufen|erwerben)/i;
handler.register = true;
handler.rpg = true;

module.exports = handler;