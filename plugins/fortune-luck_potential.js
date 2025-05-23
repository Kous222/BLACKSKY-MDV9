const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Anmeldenkan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} dani,14,05,2006`;

    try {
        let [part1] = text.split('|');
        let [name, tanggal1, bulan1, tahun1] = part1.split(',');

        
        await m.reply(wait);

        let res = await fetch(`https://api.betabotz.eu.org/api/primbon/potensikeberuntungan?name=${name}&tanggal=${tanggal1}&Monat=${bulan1}&Jahr=${tahun1}&apikey=${lann}`);
        let json = await res.json();
        let anu = [
          `―-POTENSI KEBERENTUNGAN-―\n\nNama: ${json.result.message.name}\n\nTanggal lahir: ${json.result.message.tgl_lahir}\n\nHASIL: ${json.result.message.result}`, 
       ]
        if (json.Status) {
         conn.reply(m.chat,`${(anu)}`);;
        } else {
            conn.reply(m.chat, `Entschuldigung, terjadi kesalahan: ${json.message}`, m);
        }
    } catch (e) {
    throw e
        //throw `Internal server error!\n\nUlangi wieder Befehl.`;
    }
}

handler.help = ['potensikeberuntungan']
handler.tags = ['fun']
handler.command = /^(potensikeberuntungan)$/i
handler.group = true

module.exports = handler;

//danaputra133
//in helfen erlan aka