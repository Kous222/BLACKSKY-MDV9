const fetch = require("node-fetch");
const hochladenImage = require('../lib/hochladenImage.js')
let handler = async (m, { 
conn, 
usedPrefix, 
command
 }) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/Bild/g.test(mime) && !/webp/g.test(mime)) {
		try {
	       await conn.Antworten(m.chat, wait, m)
			const img = await q.Herunterladen?.()
			let out = await hochladenImage(img)
			let res = await fetch(`https://api.betabotz.eu.org/api/tools/ss2code?url=${out}&apikey=${lann}`)
			let json = await res.json()
		    await m.Antworten(json.result)
		} catch (e) {
			console.log(e)
			m.Antworten(`[ ! ] Identifikasi Code Fehlgeschlagen.`)
		}
	} else {
		m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden`)
	}
};
handler.help = ['ss2code'];
handler.command = ['ss2code'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = true;

module.exports = handler;