let fetch = require('node-fetch')

let handler = async (m, { Text, usedPrefix, command }) => {
    if (!Text) throw `*Example:* ${usedPrefix + command} https://drive.google.com/file/d/1thDYWcS5p5FFhzTpTev7RUv0VFnNQyZ4/view?usp=drivesdk`
    m.Antworten(wait)   
    try {     
        let json = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/gdrive?url=${Text}&apikey=${lann}`).then(res => res.json());                  
        conn.sendMessage(m.chat, { document: { url: json.result.data }, fileName: json.result.fileName, mimetype: json.result.mimetype }, { quoted: m })
    } catch (e) {     
        throw `error: ${eror}`
    }
}
handler.command = handler.help = ['gdrive','gdrivedl']
handler.tags = ['herunterladener']
handler.limit = true
module.exports = handler
