const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage')

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^Bild/.test(mime) && !/webp/.test(mime)) {
      const img = await q.Herunterladen();
      const out = await hochladenImage(img);
      m.Antworten(wait);
      if (command === 'hd') {
        const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini?url=${out}&apikey=${lann}`);
        const Bild = await api.json();
        const { url } = Bild;
        conn.sendFile(m.chat, url, null, wm, m);
      } else if (command === 'hd2') {       
        try {
          const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini-v2?url=${out}&apikey=${lann}`);
          const response = await api.Text();
          let Bild;
          try {
            Bild = JSON.parse(response);
          } catch (error) {
            console.error(`parse: ${error}`);
            return;
          }
          const { url } = Bild;
          conn.sendFile(m.chat, url, null, wm, m);
        } catch (error) {
          throw error;
        }
      } else if (command === 'hd3') {
        const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini-v3?url=${out}&resolusi=4&apikey=${lann}`);
        const Bild = await api.json();
        const url = Bild.url;
        conn.sendFile(m.chat, url, null, wm, m);
       } else if (command === 'removebg' || command === 'nobg') {
        const api = await fetch(`https://api.betabotz.eu.org/api/tools/removebg?url=${out}&apikey=${lann}`);
        const Bild = await api.json();
        const url = Bild.url;
        conn.sendFile(m.chat, url, null, wm, m);
      }
    } else {
      m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden.`);
    }
  } catch (e) {
    console.error(e);
    throw `🚩 *Server error*`
  }
}

handler.command = handler.help = ['hd', 'hd2', 'hd3','removebg','nobg'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = false;

module.exports = handler;
