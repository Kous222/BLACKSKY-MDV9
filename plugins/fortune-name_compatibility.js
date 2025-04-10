const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Anmeldenkan Name und Tanggal Lahir!\n\ncontoh: ${usedPrefix + command} dani,14,05,2006`;

    try {
        //sengaja gibt split gak ngaruh zu program kok
        let [part1] = text.split('|');
        let [nama1, tanggal1, bulan1, tahun1] = part1.split(',');        
        await m.reply(wait);

        let res = await fetch(`https://api.betabotz.eu.org/api/primbon/kecocokannama?name=${nama1}&tanggal=${tanggal1}&Monat=${bulan1}&Jahr=${tahun1}&apikey=${lann}`);
        let json = await res.json();
        let anu = [
          `―-KECOCOKAN NAME-―\n\nNama du:${json.result.message.name}\n\nTanggal lahir du:${json.result.message.tgl_lahir}\n\nDaya hidup:${json.result.message.life_path}\n\nDestiny:${json.result.message.destiny}\n\nPersonality:${json.result.message.persentase_kecocokan}\n\nPersentase kecocokan:${json.result.message.personality}\n\nCatatan:${json.result.message.catatan}`, 
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

handler.help = ['kecocokannama']
handler.tags = ['fun']
handler.command = /^(kecocokannama)$/i
handler.group = true

module.exports = handler;

//danaputra133
//in helfen erlan aka