let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
// if (!text) throw `Anmeldenkan Name!\n\ncontoh: ${usedPrefix + command} "dana"`;
if (!text) throw `Anmeldenkan Mimpi du!\n\ncontoh: ${usedPrefix + command} mandi `;
try {
  await m.reply(wait)
  let res = await fetch(`https://api.betabotz.eu.org/api/primbon/artimimpi?mimpi=${text}&apikey=${lann}`);
  let json = await res.json()
  let anu = [
       `―-ARTI MIMPI-―\n\nMimpi: ${json.result.message.mimpi}\n\nArti: ${json.result.message.arti}\n\nSolusi: ${json.result.message.solusi}`, 
    ]
conn.reply(m.chat,`${(anu)}`);;
} catch (e) {
throw `Internal server eror!\n\nwiederholen wieder Befehl`
  }
}
  
    handler.help = ['artimimpi']
    handler.tags = ['fun']
    handler.command = /^(artimimpi)$/i
    handler.group = true
    
    module.exports = handler
    

  //   {
  //     "Status": true,
  //     "code": 200,
  //     "creator": "BetaBotz",
  //     "result": {
  //         "Status": true,
  //         "message": {
  //             "mimpi": "mandi",
  //             "arti": "Mimpi mandi air dingin = Wird kann mengalahkan Feind-musuhnya.Mimpi mandi air jernih einmal = Alamat suatu kebahagiaan.Mimpi mandi air panas = Alamat kena penyakit (sakit).Mimpi mandi air das/der/die keruh = Wird sakit oder rugi.Mimpi mandi in sungai = Wird mendapat keberkatan.Mimpi mandi in Ort terbuka = Alamat kann tabah.Mimpi mandi in tepi laut = Wird menemui suatu keasyikan bercinta.Mimpi gerade mandi = Pertanda wird terlepas von malapetaka oder kesialan.Mimpi mandi in sungai = Pertanda wird immer terjaga kesehatannya.",
  //             "solusi": "Menanggwiederholen akibat von tafsir mimpi das/der/die buruk\n      Wenn Sie bermimpi sesuatu das/der/die kann berakibat buruk für Sie und keluarga \n      (wie mimpi gigi copot dll) Sie in harapkan durchführen hal-hal als \n      folgendes für menanggwiederholennya:\n      Ambillah sapu lidi (kann auch tusuk gigi, bambu kecil dll). Lalu potong \n      oder patahkan mit tangan Sie werden 7 (tujuh) batang, kecil-kecil, \n      kira-kira 3 sentimeter. Sediakan selembar kertas oder tissue. Siapkan \n      garam dapur, sedikit nur. Taruhlah potongan zu tujuh sapu lidi und garam \n      dapur vorhin zu in tissue oder kertas. Lipat kertas erwähnt und kuburkan \n      zu in tanah (pekarangan, halaman rumah Sie). Kalimat das/der/die Sie müssen \n      ucapkan ketika wird mengubur/membenam kertas (das/der/die berisi 7 potong sapu \n      lidi und garam) erwähnt ist kalimat das/der/die meminta zu Jang Maha \n      Kuasa damit in jauhi von akibat buruk mimpi Sie.\n      Contoh kalimat:\"Ja Tuhan.. Jauhkanlah ich und keluarga ich von \n      malapetaka. Nein wird tumbuh/also, garam das/der/die ich kubur dies. Wie \n      halnya mimpi ich das/der/die kann berakibat buruk für kami nicht wird werden \n      kenyataan oder nicht wird terjadi. Amien..\"\n\n\n< zurück"
  //         }
  //     }
  // }



//danaputra133