var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Bitte gib eine Frage ein!\n\n*Beispiel:* Wer ist der Bundeskanzler von Deutschland? `
try {
  await m.reply(wait)
  var apii = await fetch(`https://api.betabotz.eu.org/api/search/bard-ai?apikey=${lann}&text=${text}`)
  var res = await apii.json()
  await m.reply(res.message)
} catch (err) {
  console.error(err)
  throw "Ein Fehler ist beim Beantworten der Frage aufgetreten"
}
}
handler.command = handler.help = ['bard','bardai'];
handler.tags = ['tools'];
handler.Premium = false
module.exports = handler;
