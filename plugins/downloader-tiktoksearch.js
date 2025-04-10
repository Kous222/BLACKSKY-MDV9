const fetch = require('node-fetch');
let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args[0]) throw `🚩 *Example:* ${usedPrefix + command} anime`
  try {
    const res = await fetch(`https://api.betabotz.eu.org/api/search/tiktoks?query=${args[0]}&apikey=${lann}`);
    const api = await res.json();
    const randomIndex = Math.floor(Math.random() * api.result.data.length);
    let Video = api.result.data[randomIndex];
    let capt = `乂 *T I K T O K  S E A R C H*\n\n`;
    capt += `  ◦ *Video ${randomIndex + 1}*\n`;
    capt += `  ◦ *Video id*: ${Video.video_id}\n`;
    capt += `  ◦ *Region*: ${Video.region}\n`;
    capt += `  ◦ *Title*: ${Video.title}\n`;
    capt += `  ◦ *Duration*: ${Video.duration} seconds\n`;
    capt += `  ◦ *Music Info:*\n`;
    capt += `  ◦ *id*: ${Video.music_info.id}\n`;
    capt += `  ◦ *Title*: ${Video.music_info.title}\n`;
    capt += `  ◦ *Author*: ${Video.music_info.author}\n`;
    capt += `  ◦ *Original*: ${Video.music_info.original ? "Yes" : "No"}\n`;
    capt += `  ◦ *Duration*: ${Video.music_info.duration} seconds\n`;
    capt += `  ◦ *Album*: ${Video.music_info.album}\n`;
    capt += `  ◦ *Play Count*: ${Video.play_count}\n`;
    capt += `  ◦ *Digg Count*: ${Video.digg_count}\n`;
    capt += `  ◦ *Comment Count*: ${Video.comment_count}\n`;
    capt += `  ◦ *Share Count*: ${Video.share_count}\n`;
    capt += `  ◦ *Herunterladen Count*: ${Video.herunterladen_count}\n`;
    capt += `  ◦ *Created Time*: ${new Date(Video.create_time * 1000).toUTCString()}\n`;
    capt += `  ◦ *Is Ad*: ${Video.is_ad ? "Yes" : "No"}\n`;
    capt += `  ◦ *Is Top*: ${Video.is_top ? "Yes" : "No"}\n`;
    capt += `  ◦ *Author:*\n`;
    capt += `  ◦ *id*: ${Video.author.id}\n`;
    capt += `  ◦ *Unique id*: ${Video.author.unique_id}\n`;
    capt += `  ◦ *Nickname*: ${Video.author.nickname}\n`;
    capt += `\n`;
    conn.sendFile(m.chat, Video.play, null, capt, m);
  } catch (error) {
    throw `🚩 *Video Nein Gefunden!*`
  }
}
handler.help = ['ttsearch', 'sprachausgabe', 'vorlesen'].map(v => v + ' <username>');
handler.tags = ['internet'];
handler.command = /^(((tiktoksearch|ttsearch)$|sprachausgabe|vorlesen)|sprachausgabe|vorlesen)/i;
handler.limit = true;

module.exports = handler;
