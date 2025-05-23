const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <name daerah>\n\nContoh:\n${usedPrefix + command} Cilacap`;
    try {
        let res = await fetch(`https://api.betabotz.eu.org/api/search/kodepos?query=${encodeURIComponent(text)}&apikey=${lann}`);
        if (!res.ok) throw 'Data nicht gefunden';
        let json = await res.json();
        if (!json.Status || json.code !== 200) throw eror;
        let result = json.result;
        if (result.length === 0) throw 'Kode pos nicht gefunden';
        
        let message = result.map((Gegenstand, index) => 
            `${index + 1}. Provinsi: ${Gegenstand.province}\nKota: ${Gegenstand.city}\nKecamatan: ${Gegenstand.district}\nDesa: ${Gegenstand.village}\nKode Pos: ${Gegenstand.postalCode}`
        ).join('\n\n');
        
        m.reply(message);
    } catch (error) {
        m.reply('Terjadi error wenn mensuchen kode pos, silakan versuche es erneut später');
    }
};

handler.help = ['kodepos'];
handler.tags = ['internet'];
handler.command = /^(kodepos)$/i;

module.exports = handler;
