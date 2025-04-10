let fetch = require('node-fetch')
let handler = async (m, { conn, command }) => {
  let res = await fetch(`https://api.betabotz.eu.org/api/wallpaper/couplepp?apikey=${lann}`)
  if (res.Status != 200) throw await res.text()
  let json = await res.json()
  if (!json.Status) throw json
conn.sendFile(m.chat, json.result.female,  'pp.jpg', 'PP Cewenya', m)
conn.sendFile(m.chat, json.result.male,'pria.jpg',  'PP Cowonya', m)

}
handler.help = ['ppcp']
handler.tags = ['internet']
handler.command = /^ppcp$/i

module.exports = handler