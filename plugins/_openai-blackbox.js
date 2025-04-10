var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Anmeldenkan frage!\n\n*Contoh:* erstellenkan ich code express.js`
try {
  await m.reply(wait)
  var apii = await fetch(`https://api.betabotz.eu.org/api/search/blackbox-chat?text=${text}&apikey=${lann}`)
  var res = await apii.json()
  await m.reply(res.message)
} catch (err) {
  console.error(err)
  throw "Ein Error ist aufgetreten in antworten frage"
}
}
handler.command = handler.help = ['blackbox','blackboxai','aicoding'];
handler.tags = ['tools'];
handler.Premium = false
module.exports = handler;
