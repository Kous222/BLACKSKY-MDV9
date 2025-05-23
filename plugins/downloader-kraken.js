let fetch = require('node-fetch')
let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `*🚩 Example:* ${usedPrefix}${command} https://krakenfiles.com/view/HG9WxZaL08/file.html`
    let data = await (await fetch(`https://api.betabotz.eu.org/api/Herunterladen/kraken?url=${Text}&apikey=${lann}`)).json()
    let msg = `乂 *K R A K E N  D O W N L O A D E R*\n\n`
    msg += ` ◦ *name :* ${data.result.fileName}`
    msg += ` ◦ *View :* ${data.result.views}\n`
    msg += ` ◦ *Size :* ${data.result.fileSize}\n`
    msg += ` ◦ *Type :* ${data.result.fileType}\n`
    msg += ` ◦ *Uploaded :* ${data.result.hochladenDate}\n`
    msg += ` ◦ *Herunterladen :* ${data.result.herunterladens}\n`
    msg += ` ◦ *Last Herunterladen :* ${data.result.lastDownloadDate}\n`
    msg += ` ◦ *Link :* ${data.result.urlDownload}`
    msg += `\n`
    await conn.sendFile(m.chat, 'https://krakenfiles.com/images/kf_logo_dark.png', 'thumb_.png', msg, m)
    await conn.sendMessage(m.chat, { document: { url: data.result.urlDownload }, fileName: data.result.fileName, mimetype: data.result.fileType }, { quoted: m })
}

handler.help = ['krakenherunterladen'].map(v => v + ' <url>');
handler.tags = ['herunterladener'];
handler.command =  /^(krakendl|krakenherunterladen)$/i
handler.limit = true;
handler.register = false;
handler.Premium = false;

module.exports = handler
