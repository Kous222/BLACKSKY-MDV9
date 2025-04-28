const fs = require('fs')
const path = require('path')

const pluginFolder = path.join(__dirname, '../plugins')
const pluginsDB = path.join(__dirname, '../lib/plugins.json')

let handler = async (m, { conn, text }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) return m.reply('❌ Nur der Owner kann Plugins löschen.')

    if (!text) return m.reply('❗ Format: *.delplug [pluginName]*')

    let name = text.trim()

    const filename = path.join(pluginFolder, `${name}.js`)

    // Überprüfen, ob die Plugin-Datei existiert
    if (!fs.existsSync(filename)) {
        return m.reply(`❗ Das Plugin *${name}* existiert nicht im plugins-Ordner.`)
    }

    try {
        // Plugin-Datei löschen
        fs.unlinkSync(filename)

        // Plugin aus plugins.json entfernen
        if (fs.existsSync(pluginsDB)) {
            let plugins = JSON.parse(fs.readFileSync(pluginsDB))

            if (plugins[name]) {
                delete plugins[name]
                fs.writeFileSync(pluginsDB, JSON.stringify(plugins, null, 2))
            }
        }

        m.reply(`✅ Plugin *${name}* wurde erfolgreich gelöscht!`)
    } catch (err) {
        console.error(err)
        m.reply('❌ Fehler beim Löschen des Plugins.')
    }
}

handler.help = ['delplug [pluginName]']
handler.tags = ['owner']
handler.command = /^delplug$/i
handler.rowner = true

module.exports = handler
