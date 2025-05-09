const fs = require('fs');
const path = require('path');
const Plugin = require('../lib/Plugin'); // Mongoose Model
const { addPluginPath } = require('../lib/mongo'); // Speichert Pfade in DB

const pluginFolder = path.join(__dirname, '../plugins');

let handler = async (m, { conn }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) {
        return m.reply('❌ Nur der Owner kann Plugins laden.');
    }

    try {
        // Stelle sicher, dass der Ordner existiert
        if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder, { recursive: true });

        const plugins = await Plugin.find({});
        if (!plugins.length) return m.reply('⚠️ Keine Plugins in der MongoDB gefunden.');

        let loaded = 0;

        for (let plugin of plugins) {
            const filename = path.join(pluginFolder, `${plugin.name}.js`);

            // Plugin-Datei lokal schreiben
            fs.writeFileSync(filename, plugin.code, 'utf8');

            // Stelle sicher, dass der Pfad in der Plugin-DB gespeichert ist
            await addPluginPath(filename);

            loaded++;
        }

        m.reply(`✅ ${loaded} Plugins wurden erfolgreich aus MongoDB geladen und aktiviert.`);
    } catch (err) {
        console.error(err);
        m.reply('❌ Fehler beim Laden der Plugins aus MongoDB.');
    }
};

handler.help = ['loadplugins'];
handler.tags = ['owner'];
handler.command = /^loadplugins$/i;
handler.rowner = true;

module.exports = handler;
