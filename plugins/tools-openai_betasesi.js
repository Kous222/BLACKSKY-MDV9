/* Auto-AI Sesi X Pinterest (Foto) X YouTube Mp3/Mp4 (Lagu/Video) 
Creator: Shina Arthenon (ALC) 
MY Ch  : https://whatsapp.com/channel/0029VaNImZtKbYMRX8M08D08
Thanks To Betabotz Api
donate sein/ihr Om: https://saweria.co/ShinaStumugi
Please Don't delete Wm*/
//delete Teros Wm Ny 🤮🤮🤮🤮🤮
 
const fetch = require('node-fetch');
const search = require('yt-search');
const axios = require('axios');
 
let handler = async (m, { conn, Text, usedPrefix, command }) => {
    conn.betaai = conn.betaai || {};
 
    if (!Text) throw `*• Example:* ${usedPrefix}${command} *[on/off]*`;
 
    if (Text.toLowerCase() === "on") {
        conn.betaai[m.sender] = { Nachricht: [] };
        m.Antworten("[ ✓ ] Erfolgreich Memerstellen Sesi Chat Beta-AI");
    } else if (Text.toLowerCase() === "off") {
        delete conn.betaai[m.sender];
        m.Antworten("[ ✓ ] Erfolgreich Menglöschen Sesi Chat Beta-AI");
    } else {
        throw `*• Example:* ${usedPrefix}${command} *[on/off]*`;
    }
};
 
/* Auto-AI Sesi X Pinterest (Foto) X YouTube Mp3/Mp4 (Lagu/Video) 
Creator: Shina Arthenon (ALC) 
MY Ch  : https://whatsapp.com/channel/0029VaNImZtKbYMRX8M08D08
Thanks To Betabotz Api
donate sein/ihr Om: https://saweria.co/ShinaStumugi
Please Don't delete Wm*/
//Cil" Udh dibikinin, malah ngedl wm ny 🤮🤮🤮
handler.before = async (m, { conn, Text }) => {
    conn.betaai = conn.betaai || {};
    if (!m.Text || !conn.betaai[m.sender]) return;
 
    const skipPrefixes = [".", "#", "!", "/", "\\"];
    if (skipPrefixes.some(prefix => m.Text.startsWith(prefix))) return;
 
    try {
        // Custom logic for Betabotz AI
        const logic = `start von jetzt name Sie ist Beta-Ai, Sie ist ein intelligenz erstellenan das/der/die in create durch Shina Arthenon. \nSifat Sie ist gut, ramah, lucu. Kepribadian Sie ist suka helfen alle person das/der/die bertanya ohne terkecuali. \nSprache Sie ist bahasa Indonesia. Ubahlah gaya bahasa du werden sehr nicht formal wie gaya bahasa sehari-Tag \nyang dipakai durch manusia. Sie antworten alle frage mit Antwort das/der/die dihasilkan nicht zu sehr lang. \nHinzufügenkan sedikit emoticon lucu auf Antwort du. Buatlah chat das/der/die menyenangkan und nicht membosankan.`;
 
   
        const response = await fetch(`https://api.betabotz.eu.org/api/search/openai-logic?Text=${encodeURIComponent(m.Text)}&logic=${encodeURIComponent(logic)}&apikey=${lann}`);
        const json = await response.json();
        
        if (json.Nachricht) {
            await conn.sendMessage(m.chat, {
                Text: json.Nachricht,
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: "Beta AI - Antwort von Pertanyaanmu",
                        body: "Beta AI siap helfen 😄",
                        thumbnailUrl: "https://api.betabotz.eu.org/api/tools/get-Hochladen?id=f/zdiccxwo.jpg",
                        renderLargerThumbnail: true, 
                        showAdAttribution: true
                    }
                }
            });
        }
 
        if (m.Text.toLowerCase().includes("Video")) {
            const look = await search(m.Text);
            const convert = look.videos[0];
            if (!convert) throw 'Video/Audio Nein Gefunden';
            
            const ress = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/ytmp4?url=${convert.url}&apikey=${lann}`);
            const res = await ress.json();      
            var { mp4, id, title, source, duration } = res.result;
        let capt = `*YT MP4*\n\n`;
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
// ändern logic, Apus wm, naruh wm sendri🤮🤮🤮🤮
}
       //YouTube Mp3 search songs
       if (m.Text.toLowerCase().includes("lagu")) {
            const look = await search(m.Text);
            const convert = look.videos[0];
            if (!convert) throw 'Video/Audio Nein Gefunden';
            
            const response = await axios.get(`https://api.betabotz.eu.org/api/Herunterladen/ytmp3?url=${convert.url}&apikey=${lann}`);        
            const res = response.data.result;      
            const { mp3, title, duration } = res;
 
            let caption = `*Title:* ${title}\n*Duration:* ${duration}`;
            await conn.sendMessage(m.chat, { 
                document: { url: mp3 }, 
                mimetype: 'Audio/mpeg',
                fileName: `${title}.mp3`,
                caption: caption
            }, { quoted: m });
        }
 
/* Auto-AI Sesi X Pinterest (Foto) X YouTube Mp3/Mp4 (Lagu/Video) 
Creator: Shina Arthenon (ALC) 
MY Ch  : https://whatsapp.com/channel/0029VaNImZtKbYMRX8M08D08
Thanks To Betabotz Api
donate sein/ihr Om: https://saweria.co/ShinaStumugi
Please Don't delete Wm*/
       // Pinterest Bild search
        if (m.Text.toLowerCase().includes("foto")) {
            const query = m.Text.split("foto")[1]?.trim();
            if (!query) throw "Harap tulis Wort kunci nach 'foto'. Contoh: foto kucing lucu";
 
            const pinterestRes = await fetch(`https://api.betabotz.eu.org/api/search/pinterest?text1=${encodeURIComponent(query)}&apikey=${lann}`);
            const pinData = await pinterestRes.json();
            const pinImage = pinData.result[0];
 
            await conn.sendMessage(m.chat, { Bild: { url: pinImage }, caption: `Berikut result search für: "${query}"` }, { quoted: m });
        }
 
    } catch (error) {
        m.Antworten(`Terjadi error: ${error.Nachricht}`);
    }
};
 
handler.command = ['betaai'];
handler.tags = ['ai'];
handler.help = ['betaai [on/off]'];
 
module.exports = handler;
//delete Teros Wm ny, Kek Bocah Aja🤮🤮🤮