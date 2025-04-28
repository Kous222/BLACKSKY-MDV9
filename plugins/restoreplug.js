const fs = require('fs')
const path = require('path')

const pluginFolder = path.join(__dirname, '../plugins')
const pluginsDB = path.join(__dirname, '../lib/plugins.json')

let handler = async (m, { conn }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) return m.reply('❌ Nur der Owner kann Plugins wiederherstellen.')

    if (!fs.existsSync(pluginsDB)) {
        return m.reply('❗ Keine Plugin-Backup-Datei (plugins.json) gefunden.')
    }

    let plugins = JSON.parse(fs.readFileSync(pluginsDB))
    let restored = []
    let skipped = []

    for (let [name, code] of Object.entries(plugins)) {
        const filename = path.join(pluginFolder, `${name}.js`)
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, code, 'utf8')
            restored.push(name)
        } else {
            skipped.push(name)
        }
    }

    let reply = `✅ *Wiederherstellung abgeschlossen!*\n`
    if (restored.length) {
        reply += `\n*Wiederhergestellt:* ${restored.join(', ')}`
    }
    if (skipped.length) {
        reply += `\n*Übersprungen (existierten schon):* ${skipped.join(', ')}`
    }

    m.reply(reply)
}

handler.help = ['restoreplugins']
handler.tags = ['owner']
handler.command = /^restoreplugins$/i
handler.rowner = true

module.exports = handler
