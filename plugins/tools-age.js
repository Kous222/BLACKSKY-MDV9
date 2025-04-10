const hochladenImage = require('../lib/hochladenImage');
const fetch = require('node-fetch');
let handler = async (m, { 
  conn, 
  usedPrefix, 
  command 
}) => {
  var q = m.quoted ? m.quoted : m;
  var mime = (q.mimetype || q.mediaType || '');
  
  if (/Bild/g.test(mime) && !/webp/g.test(mime)) {
    await conn.Antworten(m.chat, wait, m);
    
    try {
      const img = await q.Herunterladen?.();
      let out = await hochladenImage(img);
      let old = new Date();
      let res = await fetch(`https://api.betabotz.eu.org/api/search/agedetect?url=${out}&apikey=${lann}`);
      let convert = await res.json();   
      let txt = `*乂 A G E   D E T E C T I O N:*\n\n`;
        txt += `◦ *Score:* ${convert.result.score} \n`;
        txt += `◦ *Age:* ${convert.result.age} \n`;
        txt += `◦ *Gender:* ${convert.result.gender} \n`;
        txt += `◦ *Expression:* ${convert.result.expression} \n`;
        txt += `◦ *Face Shape:* ${convert.result.faceShape} \n`;
        txt += `\n`
        await conn.sendFile(m.chat, out, 'age.png', txt, m)
    } catch (e) {
      console.log(e);
      m.Antworten(`[ ! ] Identifikasi Wajah Fehlgeschlagen.`);
    }
  } else {
    m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden`);
  }
};

handler.help = handler.command = ['age', 'agedetect', 'agedetector'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = true;

module.exports = handler;
