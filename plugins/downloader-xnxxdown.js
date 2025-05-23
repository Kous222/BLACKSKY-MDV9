var fetch = require("node-fetch")
var handler = async (m, {
 Text, 
 usedPrefix, 
 command
 }) => {
if (!Text) throw 'Anmeldenkan Query Link!'
 try {
let anu = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/xnxxdl?url=${Text}&apikey=${lann}`)
let result = await anu.json() 

conn.sendMessage(m.chat, { Video: { url: result.result.url }, fileName: 'xnxx.mp4', mimetype: 'Video/mp4' }, { quoted: m })
 } catch (e) {
 throw `*Server error!*`
 }
}
handler.command = handler.help = ['xnxxdown'];
handler.tags = ['internet'];
module.exports = handler;
