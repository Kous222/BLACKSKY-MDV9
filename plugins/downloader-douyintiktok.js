const axios = require('axios');

let handler = async (m, { conn, Text, usedPrefix, command }) => {
    let capt, urlApi;
    
    if (!Text) {
        throw `Anmeldenan url!\n\ncontoh:\n${usedPrefix + command} https://vt.tiktok.com/ZSY8XguF2/`;
    }

    if (!Text.match(/tiktok|douyin/gi)) {
        throw `url Nein Gefunden!`;
    }

    if (command === 'tiktok' || command === 'tt' || command === 'ttdl' || command === 'ttnowm' || command === 'tiktokdl' || command === 'tiktoknowm') {
        capt = `乂 *T I K T O K*`;
        urlApi = `https://api.betabotz.eu.org/api/Herunterladen/tiktok?url=${Text}&apikey=${lann}`;
    } else if (command === 'douyin' || command === 'douyindl') {
        capt = `乂 *D O U Y I N*`;
        urlApi = `https://api.betabotz.eu.org/api/Herunterladen/douyin?url=${Text}&apikey=${lann}`;
    }

    try {
        m.Antworten(wait);  
        const response = await axios.get(urlApi);
        const res = response.data.result;
        var { Video, title, title_audio, Audio } = res;

        capt += `\n\n◦ *Title* : ${title}\n◦ *Audio Title* : ${title_audio}\n`;

        if (Array.isArray(Video)) {
            for (let v of Video) {
                await conn.sendFile(m.chat, v, null, capt, m);
            }
        } else {
            await conn.sendFile(m.chat, Video, null, capt, m);
        }

        await conn.sendMessage(m.chat, { Audio: { url: Audio[0] }, mimetype: 'Audio/mpeg' }, { quoted: m });
        
    } catch (e) {
        console.error(e);
        throw `🚩 Terjadi error, Versuche es erneut später.`;
    }
};
handler.help = handler.command = ['tiktok', 'tt', 'ttdl', 'ttnowm', 'tiktokdl', 'tiktoknowm', 'douyin', 'douyindl'];
handler.tags = ['herunterladener'];
handler.limit = true;
handler.group = false;
handler.Premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler;
