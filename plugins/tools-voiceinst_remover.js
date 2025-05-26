const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenFile');

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/audio/.test(mime)) {
        let buffer = await q.download();
        await m.reply('⏳ Bitte warten, Audio wird verarbeitet...');

        try {
            let fileSizeLimit = 5 * 1024 * 1024;
            if (buffer.length > fileSizeLimit) {
                throw '❗ Die Audiodatei darf maximal 5 MB groß sein.';
            }

            let medien = await hochladener(buffer);
            let response = await fetch(`https://api.betabotz.eu.org/api/tools/voiceremover?url=${medien}&apikey=${global.lann}`);
            let res = await response.json();

            if (!res.status) throw '❌ Verarbeitung fehlgeschlagen.';

            if (command === 'vocalremover') {
                await conn.sendMessage(m.chat, {
                    audio: { url: res.result.instrumental_path },
                    mimetype: 'audio/mpeg'
                }, { quoted: m });
            } else if (command === 'instrumenremover') {
                await conn.sendMessage(m.chat, {
                    audio: { url: res.result.vocal_path },
                    mimetype: 'audio/mpeg'
                }, { quoted: m });
            }

        } catch (e) {
            console.error('[VoiceRemover Fehler]', e);
            throw '❌ *Interner Serverfehler bei der Verarbeitung.*';
        }

    } else {
        await m.reply(`❗ Bitte antworte auf eine *Audiodatei* mit dem Befehl: *${usedPrefix + command}*`);
    }
};

handler.command = ['vocalremover', 'instrumenremover'];
handler.help = ['vocalremover', 'instrumenremover'];
handler.tags = ['tools'];
handler.limit = true;

module.exports = handler;
