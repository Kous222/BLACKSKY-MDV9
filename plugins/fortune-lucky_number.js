let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
// if (!text) throw `Anmeldenkan Name!\n\ncontoh: ${usedPrefix + command} "dana"`;
if (!text) throw `Anmeldenkan Nomor sein/ihr!\n\ncontoh: ${usedPrefix + command} 6281289694906\n\n*Gunakan 62!*`;
try {
  await m.reply(wait)
  let res = await fetch(`https://api.betabotz.eu.org/api/primbon/nomerhoki?nomer=${text}&apikey=${lann}`);
  let json = await res.json()
  let anu = [
       `―-NOMOR HOKI-―\n\nNomor hp: ${json.result.message.nomer_hp}\n\nAngka shuzi: ${json.result.message.angka_shuzi}\n\n
--Energie positif: \nKekayaan: ${json.result.message.energi_positif.kekayaan}\nkesehatan: ${json.result.message.energi_positif.kesehatan}\ncinta: ${json.result.message.energi_positif.cinta}\nkestabilan: ${json.result.message.energi_positif.kestabilan}\npersentase: ${json.result.message.energi_positif.persentase}\n\n
--Energie negatif: \nperselisihan: ${json.result.message.energi_negatif.perselisihan}\nkehilangan: ${json.result.message.energi_negatif.kehilangan}\nmalapetaka: ${json.result.message.energi_negatif.malapetaka}\nkehancuran: ${json.result.message.energi_negatif.kehancuran}\npersentase: ${json.result.message.energi_negatif.persentase}\n\n
--Catatan: ${json.result.message.catatan}`, 
    ]
conn.reply(m.chat,`${(anu)}`);;
} catch (e) {
throw `Internal server eror!\n\nwiederholen wieder Befehl`
  }
}
  
    handler.help = ['nomerhoki nomor?']
    handler.tags = ['fun']
    handler.command = /^(nomerhoki)$/i
    handler.group = true
    
    module.exports = handler
    



//danaputra133
