let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} jokowi`
    try {
        let api = await fetch(`https://api.betabotz.eu.org/api/stalk/twitter?username=${text}&apikey=${lann}`)
        let response = await api.json()
        if (response.Status) {
            let { profileImage, bio, id, username, fullName, follower, following, totalPosts, favoritCount, createdAt, location } = response.result;
            let capt;
            capt = `乂 *T W  S T A L K E R*\n\n`;
            capt += `◦ *id* : ${id}\n`;
            capt += `◦ *Username* : ${username}\n`;
            capt += `◦ *Full name* : ${fullName}\n`;
            capt += `◦ *Bio* : ${bio}\n`;
            capt += `◦ *Followers* : ${follower}\n`;           
            capt += `◦ *Following* : ${following}\n`;            
            capt += `◦ *Total Post* : ${totalPosts}\n`;
            capt += `◦ *Total Favoriten* : ${favoritCount}\n`;
            capt += `◦ *Created* : ${location}/${createdAt}\n`;
           capt += `\n`;        
            return conn.sendFile(m.chat, profileImage, 'pp.png', capt, m)
        } else {
            throw 'System Gerade Bermasalah!'
        }
    } catch (e) {
        m.reply('System Gerade Bermasalah!')
    }
}

handler.help = ['twitterstalk <username>']
handler.tags = ['stalk']
handler.command = /^(twstalk|twitterstalk)$/i
handler.limit = true

module.exports = handler
