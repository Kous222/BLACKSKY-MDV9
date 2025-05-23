const fetch = require('node-fetch');

let handler = async (m, { conn, args }) => {
   let Text
    if (args.length >= 1) {
        Text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.Text) {
        Text = m.quoted.Text
    } else throw "Input Text oder Antworten Text das/der/die ingin in jadikan carbon!"
   if (!Text) return m.Antworten('masukan Text') 
   try {
   m.Antworten(wait)
   let img = await fetch(`https://api.betabotz.eu.org/api/maker/carbon?Text=${Text}&apikey=${lann}`).then(res => res.json());
   await conn.sendFile(m.chat, img.result, 'img.jpeg', '', m)
   } catch (e) {
   throw `${eror}`
   }
}

handler.help = ['carbon']
handler.tags = ['maker']
handler.command = /^(carbon|carbonara)$/i
handler.limit = true
module.exports = handler
