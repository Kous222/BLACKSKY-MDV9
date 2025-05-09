const fs = require('fs');
const path = require('path');
const { addPluginPath } = require('../lib/mongo'); // MongoDB integration for adding paths
const Plugin = require('../lib/Plugin'); // Mongoose Model for MongoDB

const pluginFolder = path.join(__dirname, '../plugins');

let handler = async (m, { conn, text }) => {
    if (!global.owner.includes(m.sender.split('@')[0])) {
        return m.reply('❌ Nur der Owner kann Plugins hinzufügen.');
    }

    if (!text) return m.reply('❗ Format: *.addplug [pluginName] [JavaScript Code]*');

    let [name, ...codeParts] = text.trim().split(' ');
    let code = codeParts.join(' ').trim();

    if (!name || !code) return m.reply('❗ Bitte gib einen Plugin-Namen und JavaScript-Code an.');

    if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder, { recursive: true });

    const filename = path.join(pluginFolder, `${name}.js`);

    if (fs.existsSync(filename)) {
        return m.reply(`❗ Ein Plugin namens *${name}* existiert bereits.`);
    }

    try {
        // Plugin lokal speichern
        fs.writeFileSync(filename, code, 'utf8');

        // Plugin auch in MongoDB speichern (Atlas)
        await Plugin.findOneAndUpdate(
            { name },
            { code },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Optionally, save the path to the database for future loading
        await addPluginPath(filename);

        m.reply(`✅ Plugin *${name}* wurde erfolgreich gespeichert!\n\nLokal und in der MongoDB gesichert.`);
    } catch (err) {
        console.error(err);
        m.reply('❌ Fehler beim Speichern des Plugins.');
    }
};

handler.help = ['addplug [pluginName] [JavaScript Code]'];
handler.tags = ['owner'];
handler.command = /^addplug$/i;
handler.rowner = true;

module.exports = handler;
