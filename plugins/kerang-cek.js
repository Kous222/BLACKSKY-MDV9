let handler = async (m, { conn, usedPrefix, command, text }) => { 
    let memek = 'https://telegra.ph/file/1aa347ff346c2bf5ee181.jpg'
    let prozent = Math.floor(Math.random() * 101)
    let eigenschaft = command.replace('cek', '').toUpperCase()
    let antwort = `
────〔 *${command}* 〕────

${eigenschaft} STUFE *${prozent}%*

Egal, wie sehr du *${eigenschaft}* bist – 
*sei einfach du selbst und sei dankbar!*
`.trim()
    m.reply(antwort)
}

handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => v + 'cek')
handler.tags = ['spaß']
handler.command = /^(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)cek/i

module.exports = handler
