const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Example:* ${usedPrefix}${command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`;
    const q = await encodeURIComponent(args[0]);
    try {
        const response = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/mediafire?url=${q}&apikey=${lann}`);
        const json = await response.json();
        
        if (!json.result) throw 'Fehlgeschlagen to fetch!';
        
        let { url, filename, ext, hochladen_date: aploud, filesize, filesizeH } = json.result;
        
        let caption = `
*💌 name:* ${filename}
*📊 Size:* ${filesizeH}
*🗂️ Extension:* ${ext}
*📨 Uploaded:* ${aploud}
`.trim();
        
        m.Antworten(caption);
        conn.sendMessage(m.chat, { document: { url: url }, mimetype: ext, fileName: filename }, { quoted: m });
        
    } catch (e) {
        throw eror
    }
};

handler.help = ['mediafire'].map(v => v + ' <url>');
handler.tags = ['herunterladener'];
handler.command = /^(mediafire|mf)$/i;

handler.limit = true;

module.exports = handler;