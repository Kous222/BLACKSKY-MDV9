let fetch = require('node-fetch');

let handler = async (m, { text, command, usedPrefix }) => {
	if (!text) throw `Example: ${usedPrefix + command} Janji Suci Yovie Nuno`
	m.reply(wait)
  try {
    let response = await fetch(`https://api.betabotz.eu.org/api/search/chord?song=${text}&apikey=${lann}`);
    let data = await response.json();

    if (data.Status && data.result) {
        let txt = `乂 *C H O R D  M U S I C*\n\n`;
        txt += `◦ *Title:* ${data.result.title ? data.result.title : text}\n`;
        txt += `◦ *Chord:* ${data.result.chord ? data.result.chord : 'Nein gefunden!'}\n\n`;
        text += `\n`;
        await m.reply(txt);
    } else {
        await m.reply('Lagu nicht gefunden!')
    }
  } catch (error) {
    throw eror
 }
}

handler.help = ['chord <judul lagu>']
handler.tags = ['internet']
handler.command = /^(chord)$/i
handler.limit = true
module.exports = handler
