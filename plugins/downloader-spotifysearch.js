let fetch = require('node-fetch');

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} Lathi`;  
  let resultText = '';
  try {
    const api = await fetch(`https://api.betabotz.eu.org/api/search/spotify?query=${text}&apikey=${lann}`);
    let json = await api.json();
    let res = json.result.data;    
    for (let i in res) {
      resultText += `*${parseInt(i) + 1}.* *Title:* ${res[i].title}\n`;
      resultText += `*Duration:* ${res[i].duration}\n`;
      resultText += `*Popularity:* ${res[i].popularity}\n`;
      resultText += `*Link:* ${res[i].url}\n\n`;
    }     
    await conn.relayMessage(m.chat, {
     extendedTextMessage:{
                text: resultText, 
                contextInfo: {
                     externalAdReply: {
                        title: '',
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://www.scdn.co/i/_global/open-graph-default.png',
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
    }}, {})
  } catch (e) {
    throw `🚩 *Fehlgeschlagen Laden Data!*`;
  }
};

handler.command = handler.help = ['spotifysearch'];
handler.tags = ['herunterladener'];
handler.Premium = false;
handler.group = false;
handler.limit = true

module.exports = handler;
