const axios = require('axios');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

const handler = async (m, { conn, args, text }) => {
    var arr = ["oben", "unten"];
    if (!arr.includes(args[0])) throw "Wählen Oben Oder Unten? format .putarkoin oben/unten";
    var terbang = arr[Math.floor(Math.random() * arr.length)];
    var res;
    var nachricht;
    var Sticker;
    var MiliSecond = 3000; //1 second

    let coins = parseInt(Math.floor(Math.random() * 100000));
    let exp = parseInt(Math.floor(Math.random() * 10000));
    let player = global.db.data.users[m.sender];

    if (terbang == "oben") {
        res = "https://cdn-icons-png.flaticon.com/512/1490/1490832.png";
        Sticker = await createSticker(false, res, wm, author, 30);
        conn.sendFile(m.chat, Sticker, 'sticker.webp', text);
    
        nachricht = `*[ Gewinnen ]*

du erhalten:
${new Intl.NumberFormat('en-US').format(coins)} Money
${new Intl.NumberFormat('en-US').format(exp)} XP
`;

        setTimeout(function() {
            conn.reply(m.chat, nachricht, m);
        }, MiliSecond);

        player.Münzen += coins * 1;
        player.exp += exp * 1;
        global.db.data.users[m.sender].tiketcoin += 1;
    } else if (terbang == "unten") {
        res = "https://cdn-icons-png.flaticon.com/512/4315/4315581.png";
        Sticker = await createSticker(false, res, wm, author, 30);
        conn.sendFile(m.chat, Sticker, 'sticker.webp', text);
    
        nachricht = `*[ Verlieren ]*

du Kehilangan:
${new Intl.NumberFormat('en-US').format(coins)} Money
${new Intl.NumberFormat('en-US').format(exp)} XP
`;

        setTimeout(function() {
            conn.reply(m.chat, nachricht, m);
        }, MiliSecond);

        player.Münzen -= coins * 1;
        player.exp -= exp * 1;
        global.db.data.users[m.sender].tiketcoin -= 1;
    }
}
handler.help = ["coinflip"];
handler.tags = ["rpg"];
handler.command = /^(coinflip|putarkoin)$/i;
handler.rpg = true
module.exports = handler;

async function createSticker(img, url, wm, author, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: wm,
        author: author,
        quality
    };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}