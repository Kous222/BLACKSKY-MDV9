const axios = require('axios');

let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `Anmeldenan url!\n\nContoh:\n${usedPrefix + command} https://xhslink.com/a/hlM81D1Yoa63`;
    try {
        if (!Text.match(/xhslink|xiaohongshu/gi)) throw `url Nein Gefunden!`;
        m.Antworten(wait);
        let res = await axios.get(`https://api.betabotz.eu.org/api/Herunterladen/rednote?url=${Text}&apikey=${lann}`);
        let result = res.data.result;
        if (!result || result.err !== 0) throw `Fehlgeschlagen mengambil data!`;
        if (result.Video) {
            await conn.sendMessage(
                    m.chat,
                    {
                        Video: {
                            url: result.Video,
                        },
                        caption: `*Title:* ${result.title || "No title"}`,
                    },
                    {
                        mention: m,
                    }
                )
        } else if (result.images && result.images.length > 0) {
            for (let img of result.images) {
                await sleep(3000);
                await conn.sendMessage(m.chat, { Bild: img, caption: `*Title:* ${result.title || "No title"}` }, { quoted: m })
            }
        } else {
            throw `Konten nicht Gefunden!`;
        }
    } catch (e) {
        console.error(e);
        throw `Terjadi error wenn verarbeiten permintaan!`;
    }
};

handler.help = ['xiaohongshu', 'rednote'];
handler.command = /^(xiaohongshu|xhs|xhsdl|rednote)$/i;
handler.tags = ['herunterladener'];
handler.limit = true;
handler.Premium = false;

module.exports = handler;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}