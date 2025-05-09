const fs = require('fs');
const path = require('path');
const { removePluginPath } = require('../lib/mongo'); // MongoDB integration for removing paths
const Plugin = require('../lib/Plugin'); // Mongoose Model for MongoDB

const pluginFolder = path.join(__dirname, '../plugins');

let handler = async (m, { conn, text }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) {
        return m.reply('❌ Nur der Owner kann Plugins löschen.');
    }

    if (!text) return m.reply('❗ Format: *.delplug [pluginName]*');

    let name = text.trim();
    const filename = path.join(pluginFolder, `${name}.js`);

    try {
        // Aus der MongoDB-Datenbank löschen
        const deleted = await Plugin.findOneAndDelete({ name });
        if (!deleted) {
            return m.reply(`❗ Das Plugin *${name}* existiert nicht in der Datenbank.`);
        }

        // Datei löschen, falls vorhanden
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }

        // Optionally, remove the plugin path from the MongoDB path list
        await removePluginPath(filename);

        m.reply(`✅ Plugin *${name}* wurde erfolgreich aus MongoDB und dem Dateisystem gelöscht.`);
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
