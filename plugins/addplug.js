const Plugin = require('../lib/pluginModel');  // Import the plugin model

let handler = async (m, { conn, text }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) return m.reply('❌ Nur der Owner kann Plugins hinzufügen.');

    if (!text) return m.reply('❗ Format: *.addplug [pluginName] [JavaScript Code]*')

    let [name, ...codeParts] = text.trim().split(' ')
    let code = codeParts.join(' ').trim()

    if (!name || !code) return m.reply('❗ Bitte gib einen Plugin-Namen und JavaScript-Code an.')

    try {
        // Check if plugin already exists in the database
        let existingPlugin = await Plugin.findOne({ name: name });
        if (existingPlugin) {
            return m.reply(`❗ Ein Plugin namens *${name}* existiert bereits in der Datenbank.`)
        }

        // Save the plugin to the database
        const newPlugin = new Plugin({ name, code });
        await newPlugin.save();

        // You can optionally save the plugin to the file system as a backup
        const fs = require('fs');
        const path = require('path');
        const pluginFolder = path.join(__dirname, '../plugins');
        if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder, { recursive: true });

        const filename = path.join(pluginFolder, `${name}.js`);
        fs.writeFileSync(filename, code, 'utf8');

        m.reply(`✅ Plugin *${name}* wurde erfolgreich gespeichert!\n\nEs ist jetzt sofort aktiv und in der Datenbank gespeichert.`);
    } catch (err) {
        console.error(err);
        m.reply('❌ Fehler beim Speichern des Plugins.');
    }
}

handler.help = ['addplug [pluginName] [JavaScript Code]']
handler.tags = ['owner']
handler.command = /^addplug$/i
handler.rowner = true

module.exports = handler;
