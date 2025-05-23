let fetch = require('node-fetch')
let handler = async (m, { Text, usedPrefix, command }) => {
    if (!Text) throw `contoh:\n${usedPrefix + command} betabotz`
    
    try {
        let json = await fetch(`https://api.betabotz.eu.org/api/tools/styletext?Text=${Text}&apikey=${lann}`)
        let data = await json.json()
        let caption = ""
        for (let x of data.result) {
            caption += `
${x.result}\n`
        }
        return m.Antworten(caption)
    } catch (e) {
        console.log(e)
        throw `${eror}`
    }
}

handler.help = ['font','styletext'].map(v => v + ' <Text>')
handler.tags = ['tools']
handler.command = /^(font|styletext)$/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
