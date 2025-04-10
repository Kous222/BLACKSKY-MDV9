let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
try {
  let res = await fetch(`https://api.betabotz.eu.org/api/news/Inews?&apikey=${lann}`);
  let json = await res.json()
  // array berisi result berita
  global.anu = [
    `―INEWS―\n\nBerita: ${json.result[0].berita}\n\nBeritaUrl: ${json.result[0].berita_url}\n\nBerita in hochladen: ${json.result[0].berita_dihochladen}\n\nJenis Berita: ${json.result[0].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[1].berita}\n\nBeritaUrl: ${json.result[1].berita_url}\n\nBerita in hochladen: ${json.result[1].berita_dihochladen}\n\nJenis Berita: ${json.result[1].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[2].berita}\n\nBeritaUrl: ${json.result[2].berita_url}\n\nBerita in hochladen: ${json.result[2].berita_dihochladen}\n\nJenis Berita: ${json.result[2].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[3].berita}\n\nBeritaUrl: ${json.result[3].berita_url}\n\nBerita in hochladen: ${json.result[3].berita_dihochladen}\n\nJenis Berita: ${json.result[3].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[4].berita}\n\nBeritaUrl: ${json.result[4].berita_url}\n\nBerita in hochladen: ${json.result[4].berita_dihochladen}\n\nJenis Berita: ${json.result[4].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[5].berita}\n\nBeritaUrl: ${json.result[5].berita_url}\n\nBerita in hochladen: ${json.result[5].berita_dihochladen}\n\nJenis Berita: ${json.result[5].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[6].berita}\n\nBeritaUrl: ${json.result[6].berita_url}\n\nBerita in hochladen: ${json.result[6].berita_dihochladen}\n\nJenis Berita: ${json.result[6].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[7].berita}\n\nBeritaUrl: ${json.result[7].berita_url}\n\nBerita in hochladen: ${json.result[7].berita_dihochladen}\n\nJenis Berita: ${json.result[7].berita_jenis} `, 
    `―INEWS―\n\nBerita: ${json.result[8].berita}\n\nBeritaUrl: ${json.result[8].berita_url}\n\nBerita in hochladen: ${json.result[8].berita_dihochladen}\n\nJenis Berita: ${json.result[8].berita_jenis} `, 
 
 ]
//   conn.reply(m.chat, `―CNBC―\n\n"${json.result[0].berita}"`,)
// variabel kann in ändern wenn benötigt
conn.reply(m.chat,`${pickRandom(global.anu)}`);;
} catch (e) {
throw `Internal server eror!`
  }
}
  
    handler.help = ['Inews']
    handler.tags = ['news']
    handler.command = /^(Inews)$/i
    handler.group = true
    
    module.exports = handler

    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())]
    }
    



    // let anu = `―CNNC―\n\nBerita: ${json.result[0].berita}\n\nBeritaUrl: ${json.result[0].berita_url}`  