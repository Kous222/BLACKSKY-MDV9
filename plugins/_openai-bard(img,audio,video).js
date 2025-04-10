const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenImage');
const hochladenFile = require('../lib/hochladenFile');

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Reply medien with text\nExample: ${usedPrefix + command} what is this?`;
  
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';
  let medien, urlAPI;
  
  await m.reply(wait);
  
  try {
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
      let buffer = await q.herunterladen();
      medien = await hochladener(buffer);
      urlAPI = `https://api.betabotz.eu.org/api/search/bard-img?url=${medien}&text=${text}&apikey=${lann}`;
    } 
    else if (/Video/g.test(mime)) {
      if (q.seconds > 60) throw 'Maximum Video duration is 60 seconds!';
      let buffer = await q.herunterladen();
      medien = await hochladenFile(buffer);
      urlAPI = `https://api.betabotz.eu.org/api/search/bard-Video?url=${medien}&text=${text}&apikey=${lann}`;
    }
    else if (/Audio/g.test(mime)) {
      let buffer = await q.herunterladen();
      medien = await hochladenFile(buffer);
      urlAPI = `https://api.betabotz.eu.org/api/search/bard-Audio?url=${medien}&text=${text}&apikey=${lann}`;
    }
    else {
      throw `Reply image/Video/Audio with command ${usedPrefix + command} your_question`;
    }

    let json = await (await fetch(urlAPI)).json();
    if (json.Status && json.result) {
      conn.sendMessage(m.chat, { text: json.result }, { quoted: m });
    } else {
      throw 'Failed to get response from Bard';
    }
    
  } catch (err) {
    console.error(err);
    throw `${eror}\n\nDetails: ${err.message}`;
  }
}

handler.help = ['bardimg', 'bardimage', 'bardvideo', 'bardaudio'];
handler.tags = ['tools'];
handler.command = /^(bardimg|bardimage|bardvideo|bardaudio)$/i;
handler.limit = true;

module.exports = handler;