const { fetchPluginPaths } = require('../lib/mongo'); // MongoDB function to fetch plugin paths

let handler = async (m, { conn }) => {
    try {
        // Fetch plugin paths from MongoDB
        const pluginPaths = await fetchPluginPaths();

        if (!pluginPaths.length) {
            return m.reply('📂 Es sind derzeit keine Plugins in der Datenbank gespeichert.');
        }

        let list = pluginPaths.map(path => `🔹 *${path}*`).join('\n');
        m.reply(`📦 *Gespeicherte Plugins:*\n\n${list}`);
    } catch (err) {
        console.error(err);
        m.reply('❌ Fehler beim Abrufen der Plugin-Liste.');
    }
};

handler.help = ['listplug'];
handler.tags = ['owner'];
handler.command = /^listplug$/i;
handler.rowner = true;

module.exports = handler;
