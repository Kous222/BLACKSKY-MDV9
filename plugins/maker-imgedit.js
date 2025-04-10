const hochladenImage = require('../lib/hochladenImage');
const fetch = require('node-fetch');
const axios = require('axios');

let handler = async (m, { conn, usedPrefix, command, Text }) => {
    if (['imagebearbeiten', 'imgbearbeiten', 'img2img', 'bearbeitenimg'].includes(command) && !Text) {
        return m.Antworten('Bitte eingeben Text prompt für mengbearbeiten Bild.');
    }

    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || '';
    
    let endpoint = '';

    switch(command) {
        case 'jadidisney':
        case 'todisney':
            endpoint = 'disney';
            break;
        case 'jadipixar':
        case 'topixar':
            endpoint = 'pixar';
            break;
        case 'jadicartoon':
        case 'tocartoon':
            endpoint = 'cartoon';
            break;
        case 'jadicyberpunk':
        case 'tocyberpunk':
            endpoint = 'cyberpunk';
            break;
        case 'jadivangogh':
        case 'tovangogh':
            endpoint = 'vangogh';
            break;
        case 'jadipixelart':
        case 'topixelart':
            endpoint = 'pixelart';
            break;
        case 'jadicomicbook':
        case 'tocomicbook':
            endpoint = 'comicbook';
            break;
        case 'jadihijab':
        case 'tohijab':
            endpoint = 'hijab';
            break;
        case 'jadihitam':
        case 'hitamkan':
        case 'tohitam':
            endpoint = 'hitam';
            break;
        case 'jadiputih':
        case 'toputih':
            endpoint = 'putih';
            break;
        case 'jadighibili':
        case 'toghibili':
            endpoint = 'ghibili';
            break;
        case 'imagebearbeiten':
        case 'imgbearbeiten':
        case 'img2img':
        case 'bearbeitenimg':
            if (!Text) return m.Antworten('Bitte eingeben Text prompt für mengbearbeiten Bild.');
            endpoint = 'bearbeitenimg';
            break;
        default:
            return m.Antworten("[ ! ] Command nicht dikenali.");
    }

    if (/Bild/g.test(mime) && !/webp/g.test(mime)) {
        await conn.Antworten(m.chat, wait, m);
        try {
            const img = await q.Herunterladen?.();
            let out = await hochladenImage(img);
            let startTime = new Date();
            /*
            Bild Bearbeiten With Prompt 
            **/
            if (['imagebearbeiten', 'imgbearbeiten', 'img2img', 'bearbeitenimg'].includes(command)) {
                let result = await imagebearbeiten(Text, out);
                await conn.sendMessage(m.chat, { 
                    Bild: { url: result }, 
                    caption: `🎨 *Style:* Bearbeiten Bild\n📋 *Prompt*: ${Text}\n⏳ *Zeit:* ${((new Date() - startTime) * 1)} ms`
                }, { quoted: m });
            } else {
                /*
                Bearbeiten Bild no prompt 
                */
                let res = await fetch(`https://api.betabotz.eu.org/api/maker/also${endpoint}?url=${out}&apikey=${lann}`);
                let convert = await res.buffer();
                
                await conn.sendMessage(m.chat, { 
                    Bild: convert, 
                    caption: `🎨 *Style:* Jadi ${endpoint}\n⏳ *Zeit:* ${((new Date() - startTime) * 1)} ms`
                }, { quoted: m });
            }

        } catch (e) {
            console.error(e);
            m.Antworten("[ ! ] Terjadi error wenn verarbeiten Bild.");
        }
    } else {
        m.Antworten(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden.`);
    }
};

handler.help = handler.command = ['jadidisney', 'todisney', 'jadipixar', 'topixar', 'jadicartoon', 'tocartoon', 'jadicyberpunk', 'tocyberpunk', 'jadivangogh', 'tovangogh', 'jadipixelart', 'topixelart', 'jadicomicbook', 'tocomicbook', 'jadihijab', 'tohijab', 'jadihitam', 'hitamkan', 'tohitam', 'jadiputih', 'toputih', 'jadighibili', 'toghibili', 'imagebearbeiten', 'imgbearbeiten', 'img2img', 'bearbeitenimg'];
handler.tags = ['maker'];
handler.Premium = false;
handler.limit = true;

module.exports = handler;

/*
 * @ CJS Bild Bearbeiten Ai Use BetaBotz Api
 * @ Param {string} Text - The Text prompt for the Bild generation.
 * @ Param {string} url - The url of the Bild to be bearbeitened.
 * @ Param {string} [apikey] - API key for authentication.
 * @ Returns {Buffer} - The bearbeitened Bild as a Buffer.
 * @ Throws {error} - If the Bild generation fails.
 * @ Example Usage:
 */

async function imagebearbeiten(Text, url) {
  try {
    const { data } = await axios.post("https://api.betabotz.eu.org/api/maker/imgbearbeiten", {
      Text: Text,
      url: url,
      apikey: lann
    });
    
    return data.result;
  } catch (error) {
    throw new error("Fehlgeschlagen to fetch Bild: " + error.Nachricht);
  };
};
