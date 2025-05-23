var fetch = require('node-fetch');

var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Anmeldenkan frage!\n\n*Contoh:* Siapa du? `
//Set Logic Disini 
let logic = 'hallo Ich Ist BetaBotz-Md Bot Whatsapp Jang Dikembangkan Durch Lann,Ich Bernama Betabotz-Md,Ich Dierstellen Durch Lann Mit Penuh Kesempurnaan Jang Tiada Taraa,Wenn du Ingin Mensuchen Tau Mehr In Über Ownerku Visit https://api.betabotz.org'
await m.reply(wait)
  var js = await fetch(`https://api.betabotz.eu.org/api/search/openai-logic?text=${text}&logic=${logic}&apikey=${lann}`)
var json = await js.json()
try {
  await m.reply(json.message)
} catch (err ) {
m.reply(`${eror}`)
}}
handler.command = handler.help = ['ai2','openai2','chatgpt2'];
handler.tags = ['info'];
handler.Premium = false
module.exports = handler;
