const fetch = require('node-fetch')
let fs = require("fs")
const { MessageType } = require('@adiwajshing/baileys')
const { sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, Text, args }) => {
  if (!args[0]) throw 'Contoh penggunaan:\n\n*.emojimix 🤨+😣*'
  try {
    let [emoji1, emoji2] = Text.split`+`
    let anu = await fetch(`https://api.betabotz.eu.org/api/emoji/emojimix?emoji1=${emoji1}&emoji2=${emoji2}&apikey=${lann}`)
    let res = await anu.json()
    let Sticker = await sticker5(res.result.results[0].media_formats.png_transparent.url, false, packname, author)
    await conn.sendFile(m.chat, Sticker, 'Sticker.webp', '', m)
  } catch (e) {
    m.Antworten('*🚩 Emoji nicht support!*');
  }
}

handler.help = ['emojimix']
handler.tags = ['Sticker']
handler.command = /^(emojimix)$/i
handler.limit = true
module.exports = handler
