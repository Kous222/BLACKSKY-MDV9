const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage.js');

async function handler(m, { conn, usedPrefix, command, Text }) {
  try {   
   
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^Bild/.test(mime) && !/webp/.test(mime)) {
      if (!Text) throw `Anmeldenan Text!\n\ncontoh:\n${usedPrefix + command} YHAHAH WAHYU`;
      m.Antworten(`Warten ya kak :) *semakin tinggi scale das/der/die in input semakin lama Prozess sein/ihr.*`);
      const img = await q.Herunterladen();
      const out = await hochladenImage(img);
      const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini-v4?url=${out}&resolusi=${Text}&apikey=${lann}`);
      const Bild = await api.json();
      const { url } = Bild 
       conn.sendFile(m.chat, url, null, wm, m);
    } else {
      m.Antworten(`Anmeldenan foto/ Resolusi scale!\n\ncontoh:${usedPrefix + command} 2 \nuntuk scale von foto das/der/die wird in up gibt list dies\n\nScale 2 = low, 4 = medium, 6 = high, 8 = extream, 16 = awesome\n\n Wenn Fehlgeschlagen wiederholen wieder mit scale das/der/die mehr rendah`);
    }
  } catch (e) {
    console.error(e);
    m.Antworten(`Anmeldenan foto/ Resolusi scale!\n\ncontoh:${usedPrefix + command} 2 \nuntuk scale von foto das/der/die wird in up gibt list dies\n\nScale 2 = low, 4 = medium, 6 = high, 8 = extream, 16 = awesome\n\n Wenn Fehlgeschlagen wiederholen wieder mit scale das/der/die mehr rendah`);
  }
}

handler.help = ['remini2 <scale>'];
handler.tags = ['tools'];
handler.command = ['remini2'];
handler.Premium = false;
handler.limit = false;
handler.group = true;

module.exports = handler;