var fetch = require("node-fetch");
var handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Anmeldenan url!\n\ncontoh:\n${usedPrefix + command} https://www.facebook.com/100084756252836/videos/3391018171153874/?idorvanity=2765173437119338&mibextid=rS40aB7S9Ucbxw6v`;
  try {
    m.Antworten('*Bitte warten..*');
const url = args[0];
const get = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/fbdown?url=${url}&apikey=${lann}`);
var js = await get.json()   
conn.sendFile(m.chat, js.result[1]._url, 'fb.mp4', '', m);
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.Antworten(m.chat, `_*Terjadi error!*_`, m);
    }
  }
};
handler.help = ['facebook'];
handler.command = /^(fb|facebook|facebookdl|fbdl|fbdown|dlfb)$/i;
handler.tags = ['herunterladener'];
handler.limit = true;
handler.group = true;
handler.Premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
module.exports = handler;
