const fs = require('fs')
const path = require('path')

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Bitte gib den JavaScript-Code an, der als Plugin hinzugefügt werden soll.')
    
    const filename = path.join(__dirname, `./${text.split(' ')[0]}.js`)
    
    // Sicherstellen, dass der Code nicht leer ist
    const code = text.slice(text.indexOf(' ') + 1)
    if (!code) return m.reply('Bitte gib einen gültigen JavaScript-Code für das Plugin an.')

    // Überprüfen, ob die Datei bereits existiert
    if (fs.existsSync(filename)) {
        return m.reply(`Das Plugin '${text.split(' ')[0]}' existiert bereits.`)
    }

    // Erstellen und den neuen Plugin-Code speichern
    try {
        fs.writeFileSync(filename, code, 'utf8')
        m.reply(`Das Plugin '${text.split(' ')[0]}' wurde erfolgreich hinzugefügt!`)
    } catch (err) {
        console.error(err)
        m.reply('Es ist ein Fehler beim Speichern des Plugins aufgetreten.')
    }
}

handler.help = ['addplugin [pluginName] [JavaScript code]']
handler.tags = ['owner']
handler.command = /^addplugin$/i

handler.rowner = true

module.exports = handler
