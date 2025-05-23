let fetch = require('node-fetch');

let handler = async (m, { Text, usedPrefix, command }) => {
    if (!Text) throw `Anmeldenkan url Pastebin!\n\n*Contoh:* ${usedPrefix + command} https://pastebin.com/eQLV4GfE`;

    try {
        await m.Antworten(wait);
        let res = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/pastebin?url=${Text}&apikey=${lann}`);
        let json = await res.json();

        if (!json.Status) throw "❌ Fehlgeschlagen mengambil data von Pastebin!";

        await m.Antworten(`📄 *result Pastebin:*\n\n${json.result}`);
    } catch (e) {
        console.error(e);
        throw "❌ Terjadi error wenn mengambil data von Pastebin!";
    }
};

handler.command = ['pastebindl', 'pastebin'];
handler.tags = ['herunterladener'];
handler.help = ['pastebindl', 'pastebin'].map(a => a + ' <url>');
handler.limit = true;

module.exports = handler;