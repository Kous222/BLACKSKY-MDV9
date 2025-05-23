let fetch = require('node-fetch')
let handler = async (m, { text }) => {
if (!text) throw `Anmeldenan Apikey!`
  try {
    let api = await fetch(`https://api.betabotz.eu.org/api/checkkey?apikey=${text}`)
    let body = await api.text()
    m.reply(body)  
  } catch (e) {
    console.log(e) 
    m.reply('Apikey nicht registriert!')
  }
}          
handler.command = handler.help = ['checkapi','api'];
handler.tags = ['spielen'];
handler.private = true
module.exports = handler;
