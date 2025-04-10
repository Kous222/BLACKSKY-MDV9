let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
        let img = 'https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg'
        let dare = await fetch(`https://api.betabotz.eu.org/api/random/dare?apikey=${lann}`).then(result => result.json())
        conn.sendFile(m.chat, img, 'dare.png', `*MUTPROBE*\n\n"${dare.result}"`, m)
}
handler.help = ['dare', 'mutprobe', 'wagnis', 'herausforderung']
handler.tags = ['spaß']
handler.command = /^(dare|herausforderung|mutprobe|wagnis)$/i
handler.limit = true

module.exports = handler