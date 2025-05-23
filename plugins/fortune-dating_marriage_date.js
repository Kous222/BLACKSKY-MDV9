const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Anmeldenkan Name und Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} 14,05,2006`;

    try {
        let [part1] = text.split('|');
        let [tanggal1, bulan1, tahun1] = part1.split(',');

        
        await m.reply(wait);

        let res = await fetch(`https://api.betabotz.eu.org/api/primbon/tanggaljadianpernikahan?tanggal=${tanggal1}&Monat=${bulan1}&Jahr=${tahun1}&apikey=${lann}`);
        let json = await res.json();
        let anu = [
          `―-TANGGAL JADIAN PERNIKAHAN-―\n\nTanggal: ${json.result.message.tanggal}\n\nKarakteristik:${json.result.message.karakteristik}\n\nCatatan:${json.result.message.catatan}`, 
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

handler.help = ['tanggaljadianpernikahan']
handler.tags = ['fun']
handler.command = /^(tanggaljadianpernikahan)$/i
handler.group = true

module.exports = handler;

//danaputra133
//in helfen erlan aka