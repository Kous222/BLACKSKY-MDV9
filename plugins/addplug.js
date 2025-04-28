const fs = require('fs')
const path = require('path')

const pluginFolder = path.join(__dirname, '../plugins')
const pluginsDB = path.join(__dirname, '../lib/plugins.json')

let handler = async (m, { conn, text }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) return m.reply('❌ Nur der Owner kann Plugins hinzufügen.');

    if (!text) return m.reply('❗ Format: *.addplug [pluginName] [JavaScript Code]*')

    let [name, ...codeParts] = text.trim().split(' ')
    let code = codeParts.join(' ').trim()

    if (!name || !code) return m.reply('❗ Bitte gib einen Plugin-Namen und JavaScript-Code an.')

    if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder, { recursive: true })

    const filename = path.join(pluginFolder, `${name}.js`)

    if (fs.existsSync(filename)) {
        return m.reply(`❗ Ein Plugin namens *${name}* existiert bereits.`)
    }

    try {
        fs.writeFileSync(filename, code, 'utf8')

        // Sicherstellen, dass lib-Ordner existiert
        if (!fs.existsSync(path.join(__dirname, '../lib'))) {
            fs.mkdirSync(path.join(__dirname, '../lib'), { recursive: true })
        }

        // Sicherstellen, dass plugins.json existiert
        if (!fs.existsSync(pluginsDB)) {
            fs.writeFileSync(pluginsDB, '{}', 'utf8')
        }

        // Jetzt korrekt laden und speichern
        let plugins = JSON.parse(fs.readFileSync(pluginsDB))
        plugins[name] = code
        fs.writeFileSync(pluginsDB, JSON.stringify(plugins, null, 2))

        m.reply(`✅ Plugin *${name}* wurde erfolgreich gespeichert!\n\nEs ist jetzt sofort aktiv.\n(Backup auch in plugins.json)`)
    } catch (err) {
        console.error(err)
        m.reply('❌ Fehler beim Speichern des Plugins.')
    }
}

handler.help = ['addplug [pluginName] [JavaScript Code]']
handler.tags = ['owner']
handler.command = /^addplug$/i
handler.rowner = true

module.exports = handler
