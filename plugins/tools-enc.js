const JavaScriptObfuscator = require('javascript-obfuscator')

let handler = async (m, { conn, Text }) => {
if (!Text) throw `[!] Anmeldenan textnya`
let res = JavaScriptObfuscator.obfuscate(Text)
conn.Antworten(m.chat, res.getObfuscatedCode(), m)
}
handler.help = ['enc']
handler.tags = ['tools']
handler.command = /^enc$/i

module.exports = handler
