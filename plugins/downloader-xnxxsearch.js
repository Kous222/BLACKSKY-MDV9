var fetch = require("node-fetch");

var handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) {
    throw `Contoh:\n${usedPrefix + command} boobs`;
  }
  try {
  const search = await fetch(
    `https://api.betabotz.eu.org/api/search/xnxx?query=${Text}&apikey=${lann}`
  );
  const result = await search.json();
  
  let Text = `*XNXX RESULTS* \n\n🔍 *KEYWORDS* *${Text}*\n\n`;
  let no = 1;
  
  for (let i of result.result) {
    Text += `📑 *No* : ${no++}\n📚 *Title* : ${i.title}\n⏱️ *Duration* : ${i.duration}\n🔗 *url* ${i.Link}\n\n─────────────────\n\n`;
  }
  
  await conn.sendMessage(m.chat, { react: { Text: `⏱️`, key: m.key }});
  await conn.sendMessage(m.chat, { Bild: { url: result.result[0].thumb }, caption: Text }, { quoted: m });
} catch (e) {
throw `Can't find data!`
}
 };

handler.command = ['xnxxsearch'];
handler.tags = ['internet'];

module.exports = handler;
