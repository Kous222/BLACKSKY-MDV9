const fetch = require('node-fetch');
const hochladener = require('../lib/hochladenImage');

let handler = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || '' 
  if (/Bild/g.test(mime) && !/webp/g.test(mime)) {
    let buffer = await q.Herunterladen()
    await m.Antworten(wait)    
    try {
      let medien = await hochladener(buffer)
      let api = await fetch(`https://api.betabotz.eu.org/api/tools/nsfw-detect?url=${medien}&apikey=${lann}`)
      let response = await api.json()  
      if (response.Status) {
        let { labelName, labelId, confidence } = response.result;
        let capt;
            capt = `乂 *N S F W D E T E C T O R*\n\n`;
            capt += `◦ *Label name* : ${labelName}\n`;
            capt += `◦ *Label Id* : ${labelId}\n`;
            capt += `◦ *Confidence* : ${confidence}\n`;
            m.Antworten(capt);
      }
      
    } catch (err) {
      throw `${eror}`
    }
  } else {
    throw `Antworten Bild with command ${usedPrefix + command}`
  }
}

handler.help = ['nsfwdetector']
handler.tags = ['tools']
handler.command = /^(nsfwdetector|nsfwdetecd)$/i
handler.limit = 1
handler.group = true

module.exports = handler