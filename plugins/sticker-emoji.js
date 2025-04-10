var { 
sticker5 
} = require('../lib/sticker')
let handler = async (m, { conn, command, Text, usedPrefix }) => {
  if (!Text) throw `🚩 *Contoh:* ${usedPrefix + command} 🗿`
     await conn.Antworten(m.chat, wait, m)
     try {
        if (command == 'stikapple') {
        const res = `https://api.betabotz.eu.org/api/emoji/apple?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikgoogle') {
        const res = `https://api.betabotz.eu.org/api/emoji/google?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stiksamsung') {
        const res = `https://api.betabotz.eu.org/api/emoji/samsung?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikmicrosoft') {
        const res = `https://api.betabotz.eu.org/api/emoji/microsoft?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikwhatsapp') {
        const res = `https://api.betabotz.eu.org/api/emoji/whatsapp?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stiktwitter') {
        const res = `https://api.betabotz.eu.org/api/emoji/twitter?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikfacebook') {
        const res = `https://api.betabotz.eu.org/api/emoji/facebook?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikskype') {
        const res = `https://api.betabotz.eu.org/api/emoji/skype?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikjoypixels') {
        const res = `https://api.betabotz.eu.org/api/emoji/joypixels?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikopenmoji') {
        const res = `https://api.betabotz.eu.org/api/emoji/openmoji?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikemojipedia') {
        const res = `https://api.betabotz.eu.org/api/emoji/emojipedia?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stiklg') {
        const res = `https://api.betabotz.eu.org/api/emoji/lg?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikjoypixels') {
        const res = `https://api.betabotz.eu.org/api/emoji/joypixels?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikhtc') {
        const res = `https://api.betabotz.eu.org/api/emoji/htc?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikmozilla') {
        const res = `https://api.betabotz.eu.org/api/emoji/mozilla?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stiksoftbank') {
        const res = `https://api.betabotz.eu.org/api/emoji/softbank?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikdocomo') {
        const res = `https://api.betabotz.eu.org/api/emoji/docomo?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'stikkddi') {
        const res = `https://api.betabotz.eu.org/api/emoji/kddi?emoji=${encodeURIComponent(Text)}&apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
    } catch (e) {
        console.log(e)
        throw '*🚩 Sticker nicht in finden!*'
    }
}

handler.command = handler.help = ['stikapple', 'stikkddi', 'stikgoogle', 'stikdocomo', 'stiksoftbank', 'stikhtc', 'stikmozilla', 'stiklg', 'stikopenmoji', 'stikemojipedia', 'stikjoypixels', 'stikopenmoji', 'stikfacebook', 'stikskype', 'stikwhatsapp', 'stiktwitter', 'stiksamsung', 'stikmicrosoft']
handler.tags = ['Sticker'] 
handler.limit = true
module.exports = handler
