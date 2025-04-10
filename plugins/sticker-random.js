var { 
sticker5 
} = require('../lib/sticker')
var handler = async (m, {
 conn, 
 command
 }) => {
    var error = (`https://telegra.ph/file/12141dd462ecabeed1347.png`)
    try {
        if (command == 'dinokuning' || command == 'sdino') {
        const res = `https://api.betabotz.eu.org/api/Sticker/dinokuning?apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'patrick' || command == 'spatrick') {
        const res = `https://api.betabotz.eu.org/api/Sticker/patrick?apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'spongebob' || command == 'sspongebob') {
        const res = `https://api.betabotz.eu.org/api/Sticker/spongebob?apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'doge' || command == 'sdoge') {
        const res = `https://api.betabotz.eu.org/api/Sticker/doge?apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
        else if (command == 'manusialidi' || command == 'smanusialidi') {
        const res = `https://api.betabotz.eu.org/api/Sticker/manusialidi?apikey=${lann}`
            var Sticker = await sticker5(res, { packname })
            await conn.sendFile(m.chat, Sticker, 'emror.webp', '', m)
        }
    } catch (e) {
        console.log(e)
        await conn.sendFile(m.chat, error, 'error.webp', '', m)
    }
}

handler.command = handler.help = ['dinokuning', 'patrick', 'spongebob', 'doge', 'manusialidi', 'sdino', 'spatrick', 'sspongebob', 'sdoge', 'smanusialidi']
handler.tags = ['Sticker']
handler.limit = true
module.exports = handler
