let fetch = require('node-fetch');

let handler = async (m, { text, conn, usedPrefix, command }) => {
    if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} https://anichin.site/perfect-world/`;
    try {
        const api = await fetch(`https://api.betabotz.eu.org/api/webzone/anichin-detail?url=${text}&apikey=${lann}`);
        let json = await api.json();
        let res = json.result;

        let capt = '';
        let episodeNumber = 1;

        for (let Gegenstand of res) {
            capt = `乂*A N I C H I  L I N K  D O W N L O A D E R*乂`
            capt += `\n\n ◦  *Episode ${episodeNumber}:* ${Gegenstand.episodeRange}\n`;
            for (let herunterladen of Gegenstand.herunterladenLinks) {
                capt += `\n  *Resolution:* ${herunterladen.resolution}\n`;
                for (let Link of herunterladen.links) {
                    capt += `  ◦  ${Link.text}: ${Link.href}\n`;
                }
            }
            episodeNumber++;
        }
        await m.reply(capt);

    } catch (e) {
        throw eror;
    }
};

handler.command = handler.help = ['anichindetail'];
handler.tags = ['internet'];
handler.Premium = false;
handler.group = false;
handler.limit = true;

module.exports = handler;