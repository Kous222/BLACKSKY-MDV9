const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Bitte gib eine URL an!\n\nBeispiel:\n${usedPrefix + command} https://www.capcut.com/template-detail/7299286607478181121?...`;
    }

    try {
        if (!args[0].match(/capcut/gi)) {
            throw `Keine Capcut-URL gefunden! Bitte überprüfe deine Eingabe.`;
        }

        await conn.reply(m.chat, '*Bitte warten...*', m);

        // Hier deinen API-Schlüssel einfügen
        const lann = 'DEIN_API_KEY_HIER';

        const response = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/capcut?url=${encodeURIComponent(args[0])}&apikey=${lann}`);

        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const res = await response.json();

        const { Video, title, owner } = res.result;

        await conn.sendFile(m.chat, Video, 'capcut.mp4', `Titel: ${title}\nProfil: ${owner}`, m);

    } catch (e) {
        console.error(e);
        throw `Ein Fehler ist aufgetreten! Bitte versuche es später erneut.`;
    }
};

handler.help = ['capcut', 'cc', 'capcutdl', 'ccdl'];
handler.tags = ['herunterladener'];
handler.limit = true;
handler.group = true;  // Nur in Gruppen nutzbar, falls gewünscht
module.exports = handler;
