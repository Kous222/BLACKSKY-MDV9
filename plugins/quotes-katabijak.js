const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
const res = await fetch(`https://api.betabotz.eu.org/api/random/bijak?apikey=${lann}`).then(result => result.json())


let anu =`─────〔 *Wort Bijak* 〕─────

${res.result}
`
m.reply(anu) 
}
handler.help = ['katabijak']
handler.tags = ['quotes']
handler.command = /^(katabijak)$/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false
handler.register = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
