let fetch = require('node-fetch');
let handler = async (m, { conn }) => {
  try {
    conn.reply(m.chat, wait, m)
    let res = await fetch(`https://api.betabotz.eu.org/api/herunterladen/storyanime?apikey=${lann}`);
    let json = await res.json();
      conn.sendFile(m.chat, json.result.url, 'anime_story.mp4', "*STORY ANIME*", m);
  } catch (e) {
    throw `*Error:* ${eror}`;
  }
};

handler.help = ['storyanime'];
handler.tags = ['herunterladener'];
handler.command = /^(storyanime)$/i;
handler.limir = true 
module.exports = handler;
