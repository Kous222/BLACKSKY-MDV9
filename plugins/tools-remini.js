const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage.js');

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^Bild/.test(mime) && !/webp/.test(mime)) {
      const img = await q.Herunterladen();
      const out = await hochladenImage(img);
      const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini?url=${out}&apikey=${lann}`);
      const Bild = await api.json();
      const { url } = Bild 
       conn.sendFile(m.chat, url, null, wm, m);
    } else {
      m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden.`);
    }
  } catch (e) {
    console.error(e);
    m.Antworten(`Identifikasi Fehlgeschlagen. Silakan Versuche es erneut.`);
  }
}

handler.help = ['remini'];
handler.tags = ['tools'];
handler.command = ['remini'];
handler.Premium = false;
handler.limit = false;

module.exports = handler;
