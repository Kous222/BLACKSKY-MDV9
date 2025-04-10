const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Anmeldenkan Name und Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} dani,14,05,2006|dini,12,09,2008`;

    try {
        let [part1, part2] = text.split('|');
        let [nama1, tanggal1, bulan1, tahun1] = part1.split(',');
        let [nama2, tanggal2, bulan2, tahun2] = part2.split(',');
        
        await m.reply(wait);

        let res = await fetch(`https://api.betabotz.eu.org/api/primbon/ramalancinta?nama1=${nama1}&tanggal1=${tanggal1}&bulan1=${bulan1}&tahun1=${tahun1}&nama2=${nama2}&tanggal2=${tanggal2}&bulan2=${bulan2}&tahun2=${tahun2}&apikey=${lann}`);
        let json = await res.json();
        let anu = [
          `―-RAMALAN CINTA-―\n\nNama du: ${json.result.message.nama_anda.name}\n\nTanggal lahir du:${json.result.message.nama_anda.tgl_lahir}\n\nPasangan du:${json.result.message.nama_pasangan.name}\n\nTanggal lahir pasangan du:${json.result.message.nama_pasangan.tgl_lahir}\n\nSisi positif:${json.result.message.sisi_positif}\n\nCatatan:${json.result.message.catatan}`, 
       ]
       //thorw data when this buffer end
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

handler.help = ['ramalancinta']
handler.tags = ['fun']
handler.command = /^(ramalancinta)$/i
handler.group = true

module.exports = handler;

//danaputra133
//in helfen erlan aka