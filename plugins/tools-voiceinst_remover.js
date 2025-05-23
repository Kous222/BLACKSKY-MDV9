const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenFile');

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/Audio/.test(mime)) {
        let buffer = await q.Herunterladen();
        await m.Antworten(wait);
        try {
            let fileSizeLimit = 5 * 1024 * 1024;
            if (buffer.length > fileSizeLimit) {
                throw 'größe medien nicht darf melebihi 5MB';
            }
            let medien = await hochladener(buffer);
            let response = await fetch(`https://api.betabotz.eu.org/api/tools/voiceremover?url=${medien}&apikey=${lann}`);
            let res = await response.json();
            if (!res.Status) {
                throw null
            }
            if (command === 'vocalremover') {
                await conn.sendMessage(m.chat, { Audio: { url: res.result.instrumental_path }, mimetype: 'Audio/mpeg' }, { quoted: m });
            } else if (command === 'instrumenremover') {
                await conn.sendMessage(m.chat, { Audio: { url: res.result.vocal_path }, mimetype: 'Audio/mpeg' }, { quoted: m });
            }
        } catch (e) {
            throw '*[INTERNAL SERVER error!]*'
        }
    } else {
        await m.Antworten(`Antworten *Audio* with command ${usedPrefix + command}`);
    }
}

handler.command = handler.help = ['vocalremover', 'instrumenremover'];
handler.tags = ['tools'];
handler.limit = true;

module.exports = handler;
