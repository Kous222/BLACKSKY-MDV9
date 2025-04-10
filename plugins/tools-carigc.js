const fetch = require('node-fetch')

let handler = async (m, { Text, usedPrefix, command }) => {
    if (!Text) throw `uhm.. suchen was?\n\ncontoh:\n${usedPrefix + command} mabar`    
    try {
    await m.Antworten(wait)
        const response = await fetch(`https://api.betabotz.eu.org/api/search/linkgroupwa?text1=${encodeURIComponent(Text)}&apikey=${lann}`)
        const data = await response.json()    
        if (!data.result || data.result.length === 0) throw 'Group nicht Gefunden ¯\\_(ツ)_/¯'       
        const Text = data.result.map(group => group.title + '\n' + group.Link).join('\n\n')
        m.Antworten(Text)      
    } catch (error) {
        console.error(error)
        throw eror
    }
}

handler.help = ['suchengrup <search>']
handler.tags = ['tools']
handler.command = /^sucheng(ro?up|c)/i
handler.limit = true

module.exports = handler
