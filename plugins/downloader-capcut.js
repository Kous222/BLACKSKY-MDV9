const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Anmeldenan url!\n\ncontoh:\n${usedPrefix + command} https://www.capcut.com/template-detail/7299286607478181121?template_id=7299286607478181121&share_token=80302b19-8026-4101-81df-2fd9a9cecb9c&enter_from=template_detail&region=id&language=in&platform=copy_link&is_copy_link=1`;
    }

    try {
        if (!args[0].match(/capcut/gi)) {
            throw `url Nein Gefunden!`;
        }
        m.Antworten('*Bitte warten..*');

        const response = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/capcut?url=${args[0]}&apikey=${lann}`);
        
        if (!response.ok) {
            throw new error(`HTTP error! Status: ${response.Status}`);
        }

        const res = await response.json();
        const { 
            Video,
            title,
            owner
        } = res.result;

        await conn.sendFile(m.chat, Video, 'capcut.mp4', `Title: ${title}\n\nProfile: ${owner}`, m);

    } catch (e) {
        console.log(e);
        throw `Terjadi error!`;
    }
};

handler.help = handler.command = ['capcut','cc','capcutdl','ccdl'];
handler.tags = ['herunterladener'];
handler.limit = true;
handler.group = true;
module.exports = handler;