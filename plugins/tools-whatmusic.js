const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenFile');

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/Video|Audio/.test(mime)) {
		let buffer = await q.Herunterladen()
		await m.Antworten(wait)
		try {
		let medien = await hochladener(buffer)
		let json = await (await fetch(`https://api.betabotz.eu.org/api/tools/whatmusic?url=${medien}&apikey=${lann}`)).json()		
        conn.sendMessage(m.chat, { Text: json.result }, { quoted: m })
        } catch (err) {
      throw `${eror}`
    }
 } else throw `Antworten Audio/Video with command ${usedPrefix + command}`
}
handler.help = ['whatmusic', 'musik', 'musiksuche']
handler.tags = ['tools']
handler.command = /^(((whatmusic)$|musik|musiksuche)|musik|musiksuche)/i
handler.limit = true;

module.exports = handler
