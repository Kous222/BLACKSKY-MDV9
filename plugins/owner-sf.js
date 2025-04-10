let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. teksnya welche?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} plugins/Menü.js`
    if (!m.quoted.text) throw `antworten nachricht sein/ihr!`
    let path = `${text}`
    await require('fs').writeFileSync(path, m.quoted.text)
    m.reply(`terspeichern in ${path}`)
}
handler.help = ['sf'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^sf$/i

handler.rowner = true

module.exports = handler
