const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage.js');

async function handler(m, { conn, usedPrefix, command, args, Text }) {
	if (!Text) return m.Antworten('Senden Video/Audio mit caption .fakesecond <angka>');
  	const angka = args.join` `
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (!mime) throw 'Antworten Video/Audio'
      const img = await q.Herunterladen();
      const out = await hochladenImage(img);
	let fileSizeLimit = 15 * 1024 * 1024 // 15MB ðŸ—¿
  if (img.length > fileSizeLimit) {
    throw 'größe medien nicht darf melebihi 15MB'
  }
      if (/^Video/.test(mime)) {
      conn.sendMessage(m.chat, {
    Video: img,
    gifPlayback: false,
    seconds: angka})
   } else if (/^Audio/.test(mime)) {
    	conn.sendMessage(m.chat, {
    Audio: img,
    seconds: angka})
    } else {
      m.Antworten(`Senden Audio/Video mit caption *${usedPrefix + command}* <angka> oder tag Audio/Video das/der/die bereits disenden.`);
    }
}

handler.help = ['fakesecond <angka>'];
handler.tags = ['tools'];
handler.command = ['fakesecond'];
handler.Premium = false;
handler.limit = false;

module.exports = handler;
