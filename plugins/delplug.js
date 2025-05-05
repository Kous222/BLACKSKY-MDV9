const Plugin = require('../lib/pluginModel');  // Import the plugin model
const fs = require('fs');
const path = require('path');

const pluginFolder = path.join(__dirname, '../plugins');

let handler = async (m, { conn, text }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) return m.reply('❌ Nur der Owner kann Plugins löschen.');

    if (!text) return m.reply('❗ Format: *.delplug [pluginName]*');

    let name = text.trim();
    const filename = path.join(pluginFolder, `${name}.js`);

    try {
        // Überprüfen, ob das Plugin in der MongoDB-Datenbank existiert
        const plugin = await Plugin.findOne({ name: name });
        if (!plugin) {
            return m.reply(`❗ Das Plugin *${name}* existiert nicht in der Datenbank.`);
        }

        // Plugin aus der MongoDB-Datenbank löschen
        await Plugin.deleteOne({ name: name });

        // Überprüfen und löschen der Datei im lokalen Dateisystem
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }

        m.reply(`✅ Plugin *${name}* wurde erfolgreich gelöscht!`);
    } catch (err) {
        console.error(err);
        m.reply('❌ Fehler beim Löschen des Plugins.');
    }
};

handler.help = ['delplug [pluginName]'];
handler.tags = ['owner'];
handler.command = /^delplug$/i;
handler.rowner = true;

module.exports = handler;
