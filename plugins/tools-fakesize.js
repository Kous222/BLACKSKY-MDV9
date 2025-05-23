const fetch = require('node-fetch');
const hochladenImage = require('../lib/hochladenImage.js');

async function handler(m, { conn, usedPrefix, command, args, Text }) {
	if (!Text) return m.Antworten('Senden Video/Bild/Audio mit caption .fakesize <angka>');
  	const angka = args.join` `
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (!mime) throw 'Antworten Video/Bild/Audio'
      const img = await q.Herunterladen();
      const out = await hochladenImage(img);
	let fileSizeLimit = 15 * 1024 * 1024 // 15MB ðŸ—¿
  if (img.length > fileSizeLimit) {
    throw 'größe medien nicht darf melebihi 15MB'
  }
	if (/^Audio/.test(mime)) {
      conn.sendMessage(m.chat, {
    Audio: img,
    mimetype: 'Audio/mpeg',
    fileLength: angka})
   } else if (/^Video/.test(mime)) {
      conn.sendMessage(m.chat, {
    Video: img,
    gifPlayback: false,
    fileLength: angka})
   } else if (/^Bild/.test(mime)) {
    	conn.sendMessage(m.chat, {
    Bild: img,
    fileLength: angka})
    } else {
      m.Antworten(`Senden Bild/Video/Audio mit caption *${usedPrefix + command}* <angka> oder tag Bild/Video/Audio das/der/die bereits disenden.`);
    }
}

handler.help = ['fakesize <angka>'];
handler.tags = ['tools'];
handler.command = ['fakesize'];
handler.Premium = false;
handler.limit = false;

module.exports = handler;
