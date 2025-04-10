let fetch = require('node-fetch')
let handler = async (m, { conn } ) => {   
let res = await fetch(`https://api.betabotz.eu.org/api/webzone/gore?apikey=${lann}`).then(result => result.json())
let anu =`
─────> *GORE* <─────

*JUDUL*:
${res.result.title}\n
*AUTHOR*: ${res.result.author}
*VIEW*: ${res.result.views}
*COMMENT*: ${res.result.comments}
*Link*: ${res.result.url}\n
\`benutze vpn wenn ingin menonton\`
`
conn.sendMessage(m.chat, {
                    Text: anu, 
                    contextInfo: {
                         externalAdReply: {
                            title: "RANDOM GORE",
                            body: '',
                            renderLargerThumbnail: true,
                            thumbnailUrl: 'https://telegra.ph/file/13912a80a67472cad91c3.jpg',
                            sourceUrl: null,
                            mediaType: 1,
                        }
                    }, mentions: [m.sender]
    }, {})
}
handler.help = ['gore']
handler.tags = ['internet', 'herunterladener'];
handler.command = /^(gore)$/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler


//danapurta133