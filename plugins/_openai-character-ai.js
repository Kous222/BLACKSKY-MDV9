 const fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw(`Input Text Und Charakter!\nExample: ${usedPrefix + command} hallo Linksto|Linksto`)    
  try {
    let [ prompt, logic ] = text.split('|')
    m.reply(`Warten sebentar...`)
    let res = await fetch(`https://api.betabotz.eu.org/api/search/c-ai?prompt=${prompt}?&char=${logic}&apikey=${lann}`)
    let json = await res.json()
    m.reply(json.message)
  } catch (error) {
    console.error(error)
    m.reply('Ein Error ist aufgetreten wenn menjalankan Befehl.')
  }
}

handler.command = handler.help = ['c-ai','character-ai']
handler.tags = ['tools']
handler.owner = false
handler.limit = false
handler.group = false
handler.private = false

module.exports = handler
