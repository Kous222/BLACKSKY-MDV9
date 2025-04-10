let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} deaafrizal`
    try {
        let api = await fetch(`https://api.betabotz.eu.org/api/stalk/yt?username=${text}&apikey=${lann}`)
        let response = await api.json()
        if (response.Status) {
            let { channelId, url, channelName, avatar, isVerified, subscriberH, subscriber, description } = response.result.data[0];
            let capt;
            capt = `乂 *Y O U T U B E  C H A N N E L*\n\n`;
            capt += `◦ *Channel id* : ${channelId}\n`;
            capt += `◦ *url* : ${url}\n`;
            capt += `◦ *Channel name* : ${channelName}\n`;
            capt += `◦ *Avatar* : ${avatar}\n`;
            capt += `◦ *Verified* : ${isVerified}\n`;
            capt += `◦ *Subscribers* : ${subscriberH}\n`;
            capt += `◦ *Subscriber Count* : ${subscriber}\n`;
            capt += `◦ *Description* : ${description}\n`;
            capt += `\n`; 
            return conn.sendFile(m.chat, avatar, 'pp.png', capt, m)
        } else {
            throw 'System Gerade Bermasalah!'
        }
    } catch (e) {
        m.reply('System Gerade Bermasalah!')
    }
}

handler.help = ['ytstalk <username>']
handler.tags = ['stalk']
handler.command = /^(ytstalk)$/i
handler.limit = true

module.exports = handler
