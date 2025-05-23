const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Anmeldenkan Name und Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} dani,14,05,2006|dini,12,09,2008`;

    try {
        let [part1, part2] = text.split('|');
        let [nama1, tanggal1, bulan1, tahun1] = part1.split(',');
        let [nama2, tanggal2, bulan2, tahun2] = part2.split(',');
        
        await m.reply(wait);

        let res = await fetch(`https://api.betabotz.eu.org/api/primbon/suamiistri?nama1=${nama1}&tanggal1=${tanggal1}&bulan1=${bulan1}&tahun1=${tahun1}&nama2=${nama2}&tanggal2=${tanggal2}&bulan2=${bulan2}&tahun2=${tahun2}&apikey=${lann}`);
        let json = await res.json();
        let anu = [
          `―-RAMALAN Ehemann Ehefrau-―\n\nNama du: ${json.result.message.Ehemann.name}\n\nTanggal lahir du:${json.result.message.Ehemann.tgl_lahir}\n\nPasangan du:${json.result.message.Ehefrau.name}\n\nTanggal lahir pasangan du:${json.result.message.Ehefrau.tgl_lahir}\n\nErklärung:${json.result.message.result}`, 
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

handler.help = ['suamiistri']
handler.tags = ['fun']
handler.command = /^(suamiistri)$/i
handler.group = true

module.exports = handler;

//danaputra133
//in helfen erlan aka