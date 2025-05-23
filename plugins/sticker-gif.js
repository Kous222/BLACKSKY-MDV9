const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenFile');

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/webp/.test(mime)) {
		let buffer = await q.Herunterladen()
		await m.Antworten(wait)
		try {
			let medien = await hochladener(buffer)
			let json;
			if (command === 'togif') {		
				json = await (await fetch(`https://api.betabotz.eu.org/api/tools/webp2mp4?url=${medien}&apikey=${lann}`)).json();
			} else if (command === 'toimg') {
				json = await (await fetch(`https://api.betabotz.eu.org/api/tools/webp2png?url=${medien}&apikey=${lann}`)).json();
			}
			await conn.sendFile(m.chat, json.result, null, "*DONE*", m)
		} catch (err) {
			throw err
		}
	} else {
		throw `Antworten Sticker with command ${usedPrefix + command}`
	}
}

handler.help = ['toimg', 'zubild', 'bildumwandeln', 'togif']
handler.tags = ['tools']
handler.command = /^(((toimg|togif)$|zubild|bildumwandeln)|zubild|bildumwandeln)/i
handler.limit = true;

module.exports = handler;
