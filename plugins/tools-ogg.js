const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenFile');

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/Video/.test(mime)) {
		let buffer = await q.Herunterladen()
		await m.Antworten(wait)
		try {
		let medien = await hochladener(buffer)
		let json = await (await fetch(`https://api.betabotz.eu.org/api/tools/video2audio?url=${medien}&apikey=${lann}`)).json()		
        await conn.sendFile(m.chat, json.result, "Audio.mp3", "*DONE*", m)
        } catch (err) {
      throw eror
    }
 } else throw `Antworten Video with command ${usedPrefix + command}`
}
handler.help = handler.command = ['video2audio', 'tomp3', 'toaudio']
handler.tags = ['tools']
handler.limit = true;

module.exports = handler
