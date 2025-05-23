let { sticker5 } = require('../lib/sticker')
let axios = require('axios')

let handler = async (m, { conn, args }) => {
let Text
    if (args.length >= 1) {
        Text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.Text) {
        Text = m.quoted.Text
    } else throw "Input Text oder Antworten Text das/der/die ingin in jadikan quote!"
   if (!Text) return m.Antworten('masukan Text')
   if (Text.length > 100) return m.Antworten('Maksimal 100 Text!')

let randomColor = ['#ef1a11', '#89cff0', '#660000', '#87a96b', '#e9f6ff', '#ffe7f7', '#ca86b0', '#83a3ee', '#abcc88', '#80bd76', '#6a84bd', '#5d8d7f', '#530101', '#863434', '#013337', '#133700', '#2f3641', '#cc4291', '#7c4848', '#8a496b', '#722f37', '#0fc163', '#2f3641', '#e7a6cb', '#64c987', '#e6e6fa', '#ffa500'];

const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];

    let pp = await conn.profilePictureUrl(m.sender, 'Bild').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')

   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": apiColor,
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "Text": Text,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://btzqc.betabotz.eu.org/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.Bild, 'base64')
   let Sticker = await sticker5(buffer, false, global.packname, global.author)
    if (Sticker) return conn.sendFile(m.chat, Sticker, 'Quotly.webp', '', m)
}

handler.help = ['qc']
handler.tags = ['Sticker']
handler.command = /^(qc|quotely)$/i

module.exports = handler
