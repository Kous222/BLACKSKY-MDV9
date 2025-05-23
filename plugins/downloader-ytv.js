const axios = require('axios');

let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `Anmeldenan url!\n\ncontoh:\n${usedPrefix + command} https://youtu.be/4rDOsvzTicY?si=3Ps-SJyRGzMa83QT`;    
  
        if (!Text) throw 'masukan Link youtube';   
        m.Antworten(wait);      
        const response = await axios.get(`https://api.betabotz.eu.org/api/Herunterladen/ytmp4?url=${Text}&apikey=${lann}`);        
        const res = response.data.result;      
        var { mp4, id, title, source, duration } = res;
        let capt = `YT MP4*\n\n`;
        capt += `◦ *id* : ${id}\n`;
        capt += `◦ *tittle* : ${title}\n`;
        capt += `◦ *source* : ${source}\n`;
        capt += `◦ *duration* : ${duration}\n`;
        capt += `\n`;        
        // await conn.sendFile(m.chat, mp4, null, capt, m);
        await conn.sendMessage(m.chat, { 
            document: { url: mp4 }, 
            mimetype: 'Video/mp4',
            fileName: `${title}##.mp4`,
            caption: capt
        }, { quoted: m });
   
};
handler.help = ['ytmp4'];
handler.command = /^(ytmp4)$/i
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