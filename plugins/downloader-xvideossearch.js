const axios = require("axios");

var handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) {
    throw `Contoh:\n${usedPrefix + command} boobs`;
  }
  try {
  const search = await axios.get(
    `https://api.betabotz.eu.org/api/search/xvideos?query=${Text}&apikey=${lann}`)

  const result = search.data.result;
  
  let Text = `*XVIDEOS RESULTS* \n\n🔍 *KEYWORDS*: *${Text}*\n\n`;
  let no = 1;
  
  for (let i of result) {
    Text += `📑 *No* : ${no++}\n📚 *Title* : ${i.title}\n⏱️ *Duration* : ${i.duration}\n🔗 *url* ${i.url}\n\n─────────────────\n\n`;
  }
  
  await conn.sendMessage(m.chat, { react: { Text: `⏱️`, key: m.key }});
  await conn.sendMessage(m.chat, { Bild: { url: result[0].thumb }, caption: Text }, { quoted: m });
  } catch (e) {
  throw `*Server error*`
  }
 };

handler.command = ['xvideossearch','xsearch'];
handler.tags = ['internet'];

module.exports = handler;
