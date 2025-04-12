const { createHash } = require('crypto')

let handler = async function (m, { text, usedPrefix }) { 

    let sn = createHash('md5').update(m.sender).digest('hex')
    m.reply(`
Deine Seriennummer: 
${sn}`.trim())
}

handler.help = ['sn']
handler.tags = ['xp', 'rpg']
handler.command = ['sn'] 
handler.group = true
handler.rpg = true

module.exports = handler
rts = handler