
let fetch = require('node-fetch');

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) throw `*🚩 CONTOH:* ${usedPrefix + command} perfect world`;

let capt = '乂*A N I C H I N   S E A R C H*乂';
const api = await fetch(`https://api.betabotz.eu.org/api/webzone/anichin-search?query=${args[0]}&apikey=${lann}`);
let json = await api.json();
let res = json.result;

for (let i in res) {
capt += `\n\n ◦  *Title:* ${res[i].title}\n`;
capt += ` ◦  *Status:* ${res[i].Status}\n`;
capt += ` ◦  *Type:* ${res[i].type}\n`;
capt += ` ◦  *Subtitle:* ${res[i].subtitle}\n`;
capt += ` ◦  *url:* ${res[i].Link}\n`;
}
let thumb = res.length > 0 ? res[0].Bild : '';
let sourceUrl = res.length > 0 ? res[0].Link : '';

await conn.relayMessage(m.chat, {
    extendedTextMessage: {
        Text: capt,
        contextInfo: {
            externalAdReply: {
                title: 'A N I C H I N   S E A R C H',
                mediaType: 1,
                reviewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: thumb,
                sourceUrl: sourceUrl
                }
                },
            mentions: [m.sender]
            }
        }, {});
};


handler.help = ['anichin'].map(v => v + ' <judul>');
handler.tags = ['internet'];
handler.command = /^(anichin|v)$/i;
handler.limit = true;
handler.group = true;

module.exports = handler;