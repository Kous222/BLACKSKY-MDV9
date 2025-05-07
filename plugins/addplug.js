const fs = require('fs')
const path = require('path')

const pluginFolder = path.join(__dirname, '../plugins')
const pluginsDB = path.join(__dirname, '../lib/database.json')  // Hier auf database.json geändert

let handler = async (m, { conn, text }) => {
    // Überprüfen, ob der Absender der Owner ist
    if (!global.owner.includes(m.sender.split('@')[0])) {
        return m.reply('❌ Nur der Owner kann Plugins hinzufügen.');
    }

    // Überprüfen, ob Text angegeben wurde
    if (!text) return m.reply('❗ Format: *.addplug [pluginName] [JavaScript Code]*')

    // Den Plugin-Namen und Code aus dem Text extrahieren
    let [name, ...codeParts] = text.trim().split(' ')
    let code = codeParts.join(' ').trim()

    // Überprüfen, ob der Plugin-Name und der Code angegeben wurden
    if (!name || !code) return m.reply('❗ Bitte gib einen Plugin-Namen und JavaScript-Code an.')

    // Sicherstellen, dass der Plugin-Ordner existiert
    if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder, { recursive: true })

    // Dateipfad für das neue Plugin
    const filename = path.join(pluginFolder, `${name}.js`)

    // Überprüfen, ob das Plugin bereits existiert
    if (fs.existsSync(filename)) {
        return m.reply(`❗ Ein Plugin namens *${name}* existiert bereits.`)
    }

    try {
        // Plugin-Code in die Datei schreiben
        fs.writeFileSync(filename, code, 'utf8')

        // Sicherstellen, dass der lib-Ordner existiert
        if (!fs.existsSync(path.join(__dirname, '../lib'))) {
            fs.mkdirSync(path.join(__dirname, '../lib'), { recursive: true })
        }

        // Sicherstellen, dass database.json existiert
        if (!fs.existsSync(pluginsDB)) {
            fs.writeFileSync(pluginsDB, '{}', 'utf8')
        }

        // Plugins aus der database.json lesen und den neuen Plugin-Code hinzufügen
        let plugins = JSON.parse(fs.readFileSync(pluginsDB))
        plugins[name] = code

        // Plugins zurück in die database.json speichern
        fs.writeFileSync(pluginsDB, JSON.stringify(plugins, null, 2))

        // Bestätigung der erfolgreichen Speicherung
        m.reply(`✅ Plugin *${name}* wurde erfolgreich gespeichert!\n\nEs ist jetzt sofort aktiv.\n(Backup auch in database.json)`)
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
