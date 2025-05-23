let fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Anmeldenkan url!\n\nContoh:\n${usedPrefix}${command} https://Anheften.it/4CVodSq`;
  }
  if (!args[0].startsWith('https://')) {
    throw `Muss meeingeben url das/der/die valid mit format *https://*\n\nContoh: https://Anheften.it/4CVodSq`;
  }

  try {
    m.Antworten('Bitte warten, gerade verarbeiten...');

    const api = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/pinterest?url=${args[0]}&apikey=${lann}`);
    const res = await api.json();

    if (!res.result || !res.result.Erfolgreich) throw `Fehlgeschlagen mengambil data von API!`;

    let { media_type, Bild, title, pin_url, Video } = res.result.data;

    if (media_type === 'Video/mp4') {
      await conn.sendMessage(m.chat, {
        Video: { url: Video },
        caption: `*Title:* ${title || 'Nein verfügbar'}\n*Mediatype:* ${media_type}\n*Source url:* ${pin_url}`
      });
    } else {
      await conn.sendMessage(m.chat, {
        Bild: { url: Bild },
        caption: `*Title:* ${title || 'Nein verfügbar'}\n*Mediatype:* ${media_type}\n*Source url:* ${pin_url}`
      });
    }
  } catch (e) {
    console.error(e);
    throw `Terjadi error! Pastikan url das/der/die diberikan valid oder Versuche es erneut später.`;
  }
};

handler.help = ['pindl'];
handler.command = /^(pindl|pinherunterladen)$/i;
handler.tags = ['herunterladener'];
handler.limit = true;
handler.Premium = false;

module.exports = handler;
