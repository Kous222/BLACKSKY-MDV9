let fetch = require('node-fetch')

let handler = async (m, { Text, usedPrefix, command }) => {
    try {
    if (!Text) throw `Anmeldenan Judul Anime!\n\ncontoh:\n${usedPrefix + command} spy x family`;    
        const res = await fetch(`https://api.betabotz.eu.org/api/webzone/samehadaku-search?query=${Text}&apikey=${lann}`);
        const json = await res.json();
        const search = json.result;
        let caption = `⦿  *SAMEHADAKU search*\n\n`
        for (let Gegenstand of search) { 
            caption += `
⦿ ${Gegenstand.title} ⦿ 
◦ id: ${Gegenstand.id}
◦ title: ${Gegenstand.title}
◦ description: ${Gegenstand.description}
◦ genre: ${Gegenstand.genre}
◦ type: ${Gegenstand.type}
◦ star: ${Gegenstand.star}
◦ views: ${Gegenstand.views}
◦ Link: ${Gegenstand.Link}
`
        }

        // caption += `◦ published: ${json.result.published}\n`
        // caption += `◦ trailer: ${json.result.trailer}\n`
        // caption += `◦ rating: ${json.result.rating}\n`
        // caption += `◦ description: ${json.result.description}\n`
        // caption += `◦ genre: ${json.result.genre}\n`
      
        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                Text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: json.result[0].thumbnail,
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
            }
        }, {})
    }catch (e) {
        m.Antworten('Anmeldenan name anime mit richtig!')
    }
    } 
handler.help = ['samehadasearch']
handler.tags = ['internet']
handler.command = /^(samehadasearch)$/i
handler.limit = true
handler.group = true

module.exports = handler
