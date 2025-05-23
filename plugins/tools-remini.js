const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage.js');

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    
    // Überprüfen, ob eine gültige Bilddatei vorliegt (kein WebP)
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await hochladenImage(img);
      const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini?url=${out}&apikey=${lann}`);
      const result = await api.json();
      const { url } = result;

      // Sende das verbesserte Bild
      conn.sendFile(m.chat, url, null, '✔️ Bild erfolgreich verbessert!', m);
    } else {
      m.reply(`❗ Bitte sende ein *Bild* mit dem Befehl *${usedPrefix + command}*, oder *antworte* auf ein bereits gesendetes Bild.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`❌ Fehler beim Verarbeiten des Bildes. Bitte versuche es später erneut.`);
  }
}

handler.help = ['remini'];
handler.tags = ['werkzeuge'];
handler.command = ['remini'];
handler.Premium = false;
handler.limit = false;

module.exports = handler;
