let fetch = require('node-fetch')
let handler = async (m, { Text }) => {
  if (!Text) throw 'Anmeldenan url/Link sein/ihr welche?\n> .tinyurl https://google.com'
  let res = await fetch(`https://api.betabotz.eu.org/api/tools/tinyurl?Link=${Text}&apikey=${lann}`)
  let json = await res.json()
  if (json.Status) m.Antworten(json.result)
  else throw 'Link Invalid!\nPeriksa url Sie'
}
handler.help = ['tinyurl'].map(v => v + ' <Link>')
handler.tags = ['shortlink']
handler.command = /^tinyurl$/i

module.exports = handler
