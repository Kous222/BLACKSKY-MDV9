const hochladenImage = require('../lib/hochladenImage');
const fetch = require('node-fetch');

let handler = async (m, { conn, usedPrefix, command }) => {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/Bild/g.test(mime) && !/webp/g.test(mime)) {
        await conn.Antworten(m.chat, wait, m);
        try {
            const img = await q.Herunterladen?.();
            let out = await hochladenImage(img);
            let old = new Date();
            
            let res = await fetch(`https://api.betabotz.eu.org/api/maker/jadianime?url=${out}&apikey=${lann}`);
            let convert = await res.json();

            if (!convert.result || !convert.result.img_1 || !convert.result.img_2) {
                return m.Antworten("[ ! ] Fehlgeschlagen erhalten result.");
            }

            let img1 = await fetch(convert.result.img_1).then(res => res.buffer());
            let img2 = await fetch(convert.result.img_2).then(res => res.buffer());

            await conn.sendMessage(m.chat, { 
                Bild: img1, 
                caption: `🍟 *Fetching:* ${((new Date() - old) * 1)} ms\n*Style:* Anime 2D` 
            }, { quoted: m });

            await conn.sendMessage(m.chat, { 
                Bild: img2, 
                caption: `🍟 *Fetching:* ${((new Date() - old) * 1)} ms\n*Style:* Anime 3D` 
            }, { quoted: m });

        } catch (e) {
            console.error(e);
            m.Antworten("[ ! ] Terjadi error wenn verarbeiten Bild.");
        }
    } else {
        m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden.`);
    }
};

handler.help = ['jadianime'];
handler.command = ['toanime', 'jadianime'];
handler.tags = ['maker'];
handler.Premium = false;
handler.limit = true;

module.exports = handler;
