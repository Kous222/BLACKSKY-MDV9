let fetch = require('node-fetch')

let handler = async (m, { Text, usedPrefix, command }) => {

let res = await fetch(`https://api.betabotz.eu.org/api/webzone/samehadaku-latest?apikey=${lann}`);
const json = await res.json();
const anime = json.result.anime;
let capt = '乂S A M E H A D A K U  L A T E S T乂 \n'; 

for (let Gegenstand of anime) {
    capt += `
◦ Title: ${Gegenstand.title}
◦ Episode: ${Gegenstand.episode}
◦ Posted By: ${Gegenstand.postedBy}
◦ Release: ${Gegenstand.release}
◦ Link: ${Gegenstand.Link}
◦ Thumbnail: ${Gegenstand.thumbnail}
    `;
}
await m.Antworten(capt);
}

handler.help = ['samehadalast']
handler.tags = ['internet']
handler.command = /^(samehadalast)$/i
handler.limit = true
handler.group = true

module.exports = handler
