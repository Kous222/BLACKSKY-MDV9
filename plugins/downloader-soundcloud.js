const fetch = require('node-fetch')

let handler = async (m, { conn, Text, usedPrefix, command }) => {
	if (!Text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://soundcloud.com/issabella-marchelina/rest-rasa-mahalini-official-Audio?utm_source=clipboard&utm_medium=Text&utm_campaign=social_sharing`
	if (!(Text.includes('http://') || Text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let res = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/soundcloud?url=${Text}&apikey=${lann}`)
		let anu = await res.json()
		anu = anu.result
		let ini_txt = `*${anu.title}*\n\n`
		
		await conn.sendFile(m.chat, anu.thumbnail, 'scloud.jpg', ini_txt, m)
		conn.sendMessage(m.chat, {
                Audio: {
                    url: anu.url
                },
                mimetype: 'Audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: anu.title,
                        body: "",
                        thumbnailUrl: anu.thumbnail,
                        sourceUrl: anu.url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            });		
	} catch (e) {
		console.log(e)
		m.Antworten(`Invalid Soundcloud url / terjadi error.`)
	}
}

handler.help = ['soundcloud <url>']
handler.tags = ['herunterladener']
handler.command = /^(s(ound)?cloud)$/i

module.exports = handler
