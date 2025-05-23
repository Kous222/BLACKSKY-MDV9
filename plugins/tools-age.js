const hochladenImage = require('../lib/hochladenImage');
const fetch = require('node-fetch');

let handler = async (m, { 
  conn, 
  usedPrefix, 
  command 
}) => {
  // Check if the message is a reply and has a valid image
  var q = m.quoted ? m.quoted : m;
  var mime = (q.mimetype || q.mediaType || '');

  // Only proceed if the mime type is an image and not webp
  if (/image\/(jpeg|png|gif)/g.test(mime) && !/webp/g.test(mime)) {
    await conn.reply(m.chat, 'Please wait...', m); // Sending wait message
    
    try {
      const img = await q.download?.(); // Download the image
      let out = await hochladenImage(img); // Upload image to get a URL
      let old = new Date();
      
      // Fetch age detection results from the API
      let res = await fetch(`https://api.betabotz.eu.org/api/search/agedetect?url=${out}&apikey=${lann}`);
      let convert = await res.json();   
      
      let txt = `*乂 A G E   D E T E C T I O N:*\n\n`;
      txt += `◦ *Score:* ${convert.result.score} \n`;
      txt += `◦ *Age:* ${convert.result.age} \n`;
      txt += `◦ *Gender:* ${convert.result.gender} \n`;
      txt += `◦ *Expression:* ${convert.result.expression} \n`;
      txt += `◦ *Face Shape:* ${convert.result.faceShape} \n`;
      txt += `\n`
      
      // Send the result as an image with caption
      await conn.sendFile(m.chat, out, 'age.png', txt, m);
    } catch (e) {
      console.log(e);
      conn.reply(m.chat, `[ ! ] Identifikation des Gesichts ist fehlgeschlagen.`, m); // Error message
    }
  } else {
    conn.reply(m.chat, `Senden Sie ein Bild mit der Beschreibung *${usedPrefix + command}* oder markieren Sie das Bild, das bereits gesendet wurde.`, m); // If no valid image
  }
};

handler.help = handler.command = ['age', 'agedetect', 'agedetector'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = true;

module.exports = handler;
