const fs = require('fs')
const path = require('path')

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Bitte gib zuerst den Plugin-Namen und dann den JavaScript-Code an.\nBeispiel: *.addplugin test module.exports = {...}*')

    let [name, ...codeParts] = text.split(' ')
    let code = codeParts.join(' ').trim()

    if (!name || !code) {
        return m.reply('Bitte gib einen Plugin-Namen und gültigen JavaScript-Code an.')
    }

    const pluginFolder = path.join(__dirname, '../plugins') // <-- Speicher im richtigen plugins-Ordner
    if (!fs.existsSync(pluginFolder)) {
        fs.mkdirSync(pluginFolder, { recursive: true })
    }

    const filename = path.join(pluginFolder, `${name}.js`)

    // Verhindern, dass bestehende Plugins überschrieben werden
    if (fs.existsSync(filename)) {
        return m.reply(`Das Plugin '${name}' existiert bereits.`)
    }

    try {
        fs.writeFileSync(filename, code, 'utf8')
        m.reply(`✅ Das Plugin '${name}' wurde erfolgreich gespeichert und ist nach dem Neustart verfügbar.`)
    } catch (err) {
        console.error(err)
        m.reply('❌ Fehler beim Speichern des Plugins.')
    }
}

handler.help = ['addplugin [pluginName] [JavaScript code]']
handler.tags = ['owner']
handler.command = /^addplugin$/i

handler.rowner = true

module.exports = handler
