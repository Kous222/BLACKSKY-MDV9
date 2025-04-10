const axios = require('axios');

let handler = async (m, {conn, Text, usedPrefix, command}) => {
    if (!Text) throw `Anmeldenan name Hp!\n\nContoh:\n${usedPrefix + command} oppo`;
    m.Antworten(wait);
    const response = await axios.get(`https://api.betabotz.eu.org/api/search/ringtone?text1=${Text}&apikey=${lann}`);
    global.res = [

        `${response.data.result[0].Audio}`,
        `${response.data.result[1].Audio}`,
        `${response.data.result[2].Audio}`,
        `${response.data.result[3].Audio}`,
        `${response.data.result[4].Audio}`,
        `${response.data.result[5].Audio}`,
        `${response.data.result[6].Audio}`,
        `${response.data.result[7].Audio}`,
        `${response.data.result[8].Audio}`,
        `${response.data.result[9].Audio}`,
        `${response.data.result[10].Audio}`,
        `${response.data.result[11].Audio}`,
        `${response.data.result[12].Audio}`,
    ]
    await conn.sendFile(m.chat, `${pickRandom(global.res)}`, null, m);

}

handler.help = ['ringtone']
handler.tags = ['internet']
handler.command = /^(ringtone)$/i
handler.group = false
handler.limit = true
    
module.exports = handler


function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }