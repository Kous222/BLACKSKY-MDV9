const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Anmeldenkan Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} 14,05,2006`;

    try {
        let [part1] = text.split('|');
        let [tanggal1, bulan1, tahun1] = part1.split(',');

        
        await m.reply(wait);

        let res = await fetch(`https://api.betabotz.eu.org/api/primbon/wetonjawa?tanggal=${tanggal1}&Monat=${bulan1}&Jahr=${tahun1}&apikey=${lann}`);
        let json = await res.json();
        let anu = [
          `―-WETON JAWA-―\n\nTanggal: ${json.result.message.tanggal}\n\nJumlah neptu: ${json.result.message.jumlah_neptu}\n\nWatak Tag: ${json.result.message.watak_hari}\n\nNaga Tag: ${json.result.message.naga_hari}\n\nStunden balik: ${json.result.message.jam_baik}\n\nWatak kelahiran: ${json.result.message.watak_kelahiran}`, 
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

handler.help = ['wetonjawa']
handler.tags = ['fun']
handler.command = /^(wetonjawa)$/i
handler.group = true

module.exports = handler;

//danaputra133
//in helfen erlan aka