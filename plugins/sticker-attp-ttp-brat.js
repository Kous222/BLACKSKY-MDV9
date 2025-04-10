let { 
    sticker5 
} = require('../lib/sticker')
let fs = require('fs')
let fetch = require('node-fetch')

let handler = async (m, {
    conn, 
    args, 
    Text, 
    usedPrefix, 
    command
}) => {
    const packname = global.packname
    const author = global.author
    
    Text = Text ? Text : m.quoted && m.quoted.Text ? m.quoted.Text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
    if (!Text) throw `Example : ${usedPrefix + command} Lagi Ruwet`
    
    let res;
    var error = fs.readFileSync(`./medien/Sticker/emror.webp`)
    
    try {
        if (command === 'attp') {
            res = `https://api.betabotz.eu.org/api/maker/attp?Text=${encodeURIComponent(Text.substring(0, 151))}&apikey=${lann}`;
            let fetchResult = await fetch(res)
            let imageBuffer = await fetchResult.buffer()
            
            let Sticker = await sticker5(
                imageBuffer,
                null,
                packname,
                author,
                ['🎨']
            )
            
            if (Sticker) {
                await conn.sendFile(m.chat, Sticker, 'Sticker.webp', '', m)
            } else {
                throw new error('Pemerstellenan Sticker Fehlgeschlagen')
            }
        } else if (command === 'ttp') {
            res = `https://api.betabotz.eu.org/api/maker/ttp?Text=${encodeURIComponent(Text.substring(0, 151))}&apikey=${lann}`;
            let fetchResult = await fetch(res)
            let imageBuffer = await fetchResult.buffer()
            
            let Sticker = await sticker5(
                imageBuffer,
                null,
                packname,
                author,
                ['🎨']
            )
            
            if (Sticker) {
                await conn.sendFile(m.chat, Sticker, 'Sticker.webp', '', m)
            } else {
                throw new error('Pemerstellenan Sticker Fehlgeschlagen')
            }
        } else if (command === 'brat') {
            res = `https://api.betabotz.eu.org/api/maker/brat?Text=${encodeURIComponent(Text.substring(0, 151))}&apikey=${lann}`;
            let fetchResult = await fetch(res)
            let imageBuffer = await fetchResult.buffer()
            
            let Sticker = await sticker5(
                imageBuffer,
                null,
                packname,
                author,
                ['🎨']
            )
            
            if (Sticker) {
                await conn.sendFile(m.chat, Sticker, 'Sticker.webp', '', m)
            } else {
                throw new error('Pemerstellenan Sticker Fehlgeschlagen')
            }
        } else if (command === 'bratvideo') {
            res = `https://api.betabotz.eu.org/api/maker/brat-Video?Text=${encodeURIComponent(Text.substring(0, 151))}&apikey=${lann}`;
            await conn.sendVideoAsSticker(m.chat, res, m, { packname: packname, author: author })
        }
        
    } catch (e) {
        console.error('error:', e)
        await conn.sendFile(m.chat, error, 'error.webp', '', m)
    }
}

handler.command = handler.help = ['attp', 'ttp', 'brat', 'bratvideo']
handler.tags = ['Sticker']
handler.limit = true
handler.group = false

module.exports = handler