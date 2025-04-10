const fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Anmeldenkan url!\n\nContoh:\n${usedPrefix + command} https://open.spotify.com/track/3zakx7RAwdkUQlOoQ7SJRt`;
  if (!args[0].match(/spotify/gi)) throw `url Nein Gefunden!`;
  m.Antworten("Warten sebentar...");
		const urll = args[0];
		try {  
		const res = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/spotify?url=${args[0]}&apikey=${lann}`)		
let jsons = await res.json()
const { 
thumbnail, 
title,
name,
duration,
url
} = jsons.result.data
const { 
id,
type
} = jsons.result.data.artist
    let captionvid = ` ∘ Title: ${title}\n∘ Id: ${id}\n∘ Duration: ${duration}\n∘ Type: ${type}`
    let Nachricht = await conn.sendMessage(m.chat, {
    Text: captionvid,
    contextInfo: {
    externalAdReply: {
    title: "",
    body: "Powered by",
    thumbnailUrl: thumbnail ,
    sourceUrl: thumbnail,
    mediaType: 1,
    showAdAttribution: true,
    renderLargerThumbnail: true
    }}})
    await conn.sendMessage(m.chat, { Audio: { url: url }, mimetype: 'Audio/mpeg', contextInfo: {
    externalAdReply: {
    title: title,
    body: "",
    thumbnailUrl: thumbnail,
    sourceUrl: url,
    mediaType: 1,
    showAdAttribution: true,
    renderLargerThumbnail: true
    }}} , { quoted: m })
    } catch (e) {
    throw `*Server down!*`
   }
};
handler.help = ['spotify']
handler.command = /^(spotify)$/i
handler.tags = ['herunterladener'];
handler.limit = true;
handler.group = false;
handler.Premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
module.exports = handler;
