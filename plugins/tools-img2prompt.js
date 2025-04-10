const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage.js');

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^Bild/.test(mime) && !/webp/.test(mime)) {
      const img = await q.Herunterladen();
      const out = await hochladenImage(img);
      const api = await fetch(`https://api.betabotz.eu.org/api/tools/img2prompt?url=${out}&apikey=${lann}`);
      const res = await api.json();
      await conn.sendMessage(m.chat, {
    Text: res.result,
    contextInfo: {
        externalAdReply: {
            title: 'Img2Prompt',
            body: '',
            thumbnailUrl: 'https://telegra.ph/file/dbb8cc0a157e3aa856877.jpg',
            sourceUrl: "https://api.betabotz.eu.org",
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
}, {
    quoted: m
})
    } else {
      m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden.`);
    }
  } catch (e) {
    console.error(e);
    m.Antworten(`Identifikasi Fehlgeschlagen. Silakan Versuche es erneut.`);
  }
}

handler.help = ['img2prompt'];
handler.tags = ['tools'];
handler.command = ['img2prompt'];
handler.Premium = false;
handler.limit = false;
handler.group = true;

module.exports = handler;

