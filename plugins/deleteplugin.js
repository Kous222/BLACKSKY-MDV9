const fs = require('fs')
const path = require('path')

let handler = async (m, { text }) => {
    if (!text) return m.reply('Bitte gib den Namen des Plugins an, das du löschen möchtest.')

    // Entfernen der .js-Erweiterung, falls sie vorhanden ist
    const filename = path.join(__dirname, `./${text.replace(/\.js$/, '')}.js`)
    
    // Überprüfen, ob die Datei existiert
    if (!fs.existsSync(filename)) {
        return m.reply(`Das Plugin '${text}' wurde nicht gefunden!`)
    }

    // Löschen der Plugin-Datei
    try {
        fs.unlinkSync(filename)
        m.reply(`Das Plugin '${text}' wurde erfolgreich gelöscht!`)
    } catch (err) {
        console.error(err)
        m.reply('Es ist ein Fehler beim Löschen des Plugins aufgetreten.')
    }
}

handler.help = ['deleteplugin [pluginName]']
handler.tags = ['owner']
handler.command = /^deleteplugin$/i

handler.rowner = true

module.exports = handler
