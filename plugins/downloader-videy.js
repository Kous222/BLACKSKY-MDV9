const axios = require('axios');

let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `Anmeldenan url!\n\ncontoh:\n${usedPrefix + command} https://videy.co/v?id=QtZ8jT1X1`;    
    try {
        if (!Text.match(/videy/gi)) throw `url Nein Gefunden!`;        
        m.Antworten(wait);      
        let res = await axios.get(`https://api.betabotz.eu.org/api/Herunterladen/videy?url=${Text}&apikey=${lann}`)
        let data = res.data.result
        await conn.sendFile(m.chat, data, 'videy.mp4', "*DONE*", m);      
    } catch (e) {
        console.log(e);
        throw eror
    }
};
handler.help = ['videy'];
handler.command = /^(videy|videydl)$/i
handler.tags = ['herunterladener'];
handler.limit = true;

module.exports = handler;
