let fetch = require('node-fetch')
let handler = async (m, { text }) => {
if (!text) throw `Anmeldenan Username Di Website Api!`
  try {
    let api = await fetch(`https://api.betabotz.eu.org/api/checkexp?username=${text}`)
    let body = await api.text()
    m.reply(body)  
  } catch (e) {
    console.log(e) 
    m.reply('Username nicht registriert!')
  }
}          
handler.command = handler.help = ['checkexp','cekexp', 'expapi'];
handler.tags = ['spielen'];
handler.private = true
module.exports = handler;
