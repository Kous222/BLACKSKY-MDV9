const fetch = require('node-fetch');

let handler = async (m, {
  conn,
  Text,
  usedPrefix,
  command
}) => {
  if (command == 'tiktokslide' || command == 'ttslide') { // Fixed the condition for 'tiktokslide' and 'ttslide' commands
    if (!Text) throw `Anmeldenkan url!\n\ncontoh: ${usedPrefix + command} https://vt.tiktok.com/ZSY8XX78X/`;
    try {
      const api = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/ttslide?url=${Text}&apikey=${lann}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.chat,{ Bild :{ url : i } , caption : `*Title*: ${res.result.title}` }, { quoted: m });
        //await sleep(5000);
      //  conn.sendMessage(m.chat, { Audio: { url: res.result.Audio[0] }, mimetype: 'Audio/mpeg' }, { quoted: m });         
      }
    } catch (e) {
      console.log(e);
      throw `🚩 *Terjadi error!*`;
    }
  }
  if (command == 'douyinslide' || command == 'douyinfoto') { // Fixed the condition for 'douyinslide' and 'douyinfoto' commands
    if (!Text) throw `Anmeldenkan url!\n\ncontoh: ${usedPrefix + command} https://v.douyin.com/i2bPkLLo/`;
    try {
      const api = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/douyin-slide?url=${Text}&apikey=${lann}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.chat,{ Bild :{ url : i } , caption : `*Title*: ${res.result.title}` }, { quoted: m });
       // await sleep(5000);
       // conn.sendMessage(m.chat, { Audio: { url: res.result.Audio[0] }, mimetype: 'Audio/mpeg' }, { quoted: m });         
      }
    } catch (e) {
      console.log(e);
      throw `🚩 *Terjadi error!*`;
    }
  }
};

handler.command = handler.help = ['douyinslide', 'douyinfoto','ttslide','tiktokslide'];
handler.tags = ['herunterladener'];
handler.limit = true;

module.exports = handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
