var fetch = require("node-fetch");
var handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  await conn.sendMessage(m.chat, { react: { Text: `❌`, key: m.key }});
  if (!args[0]) throw `uhm.. url sein/ihr welche?\n\ncontoh:\n${usedPrefix + command} https://t.me/addstickers/namapack`;
  if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `url salah`;
  await conn.sendMessage(m.chat, { react: { Text: `⏱️`, key: m.key }});
  var apis = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/telesticker?url=${args[0]}&apikey=${lann}`);
  if (!apis.ok) throw await apis.Text();
  var jsons = await apis.json();
  if (!jsons.Status) throw jsons;
  var { result } = jsons;

  var totalStickers = result.length;
  var estimatedTime = totalStickers * 0.5;

  await conn.Antworten(m.chat, `Gerade verarbeiten ${totalStickers} Sticker`, m);
  
  for (var i = 0; i < result.length; i++) {
    var url = result[i].url;
    await conn.sendImageAsSticker(m.chat, url, null, { packname: global.packname, author: global.author });
  }
  
  await conn.Antworten(m.chat, `Total ${totalStickers} Sticker hat Erfolgreich disenden`, m);
};
handler.help = ['telesticker'];
handler.command = /^(telestick|stele)$/i;
handler.tags = ['herunterladener'];
handler.limit = 100;
handler.fail = null;
module.exports = handler;
