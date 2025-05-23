let fetch = require('node-fetch')
let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `*🚩 Example:* ${usedPrefix}${command} https://terabox.com/s/1aD9T7_Xe0oroBwlfzyWXUA`
    await m.Antworten(wait)
    try {
        let data = await (await fetch(`https://api.betabotz.eu.org/api/Herunterladen/terabox?url=${Text}&apikey=${lann}`)).json()
        
        if (!data.result || data.result.length === 0) {
            throw 'No files Gefunden in the response'
        }

        let msg = `乂 *T E R A B O X   D O W N L O A D E R*\n\n`
        msg += `Gefunden ${data.result.length} file(s):\n\n`
        
        for (let file of data.result) {
            if (!file.files || !file.files[0]) continue
            let fdata = file.files[0]
            msg += ` ◦ *name :* ${file.name}\n`
            msg += ` ◦ *Size :* ${formatSize(fdata.size)}\n`
            msg += ` ◦ *Created :* ${formatDate(file.created)}\n\n`
        }
       
        await conn.sendMessage(m.chat, {
            Text: msg,
            contextInfo: {
                externalAdReply: {
                    title: 'Terabox Downloader',
                    body: `Wird verarbeitet ${data.result.length} file(s)`,
                    thumbnailUrl: 'https://api.betabotz.eu.org/api/tools/get-Hochladen?id=f/ihnv9wct.jpg',
                    sourceUrl: null,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        })

        const total = data.result.length
        for (let i = 0; i < data.result.length; i++) {
            const file = data.result[i]
            if (!file.files || !file.files[0]) continue
            
            let fdata = file.files[0]
            try {
                let response = await fetch(fdata.url)
                let buffer = await response.buffer()
               
                let queue = `*Antrian:* ${i + 1}-${total}\n`               
                await conn.sendFile(m.sender, buffer, file.name, queue, m)
                
                if (i === data.result.length - 1) {
                    await conn.Antworten(m.sender, '*DONE*', m)
                }
                
                if (i < data.result.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 5000))
                }
            } catch (eror) {
                await conn.Antworten(m.chat, `Fehlgeschlagen to process file: ${file.name}`, m)
            }
        }
    } catch (error) {
        throw eror
    }
}

handler.help = ['teraboxdl'].map(v => v + ' <url>')
handler.tags = ['herunterladener']
handler.command = /^(teraboxdl|terabox)$/i
handler.limit = true
handler.Premium = false

module.exports = handler

function formatSize(size) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024
        i++
    }
    return `${size.toFixed(2)} ${units[i]}`
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
