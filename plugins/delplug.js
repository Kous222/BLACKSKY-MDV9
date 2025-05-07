const fs = require('fs');
const path = require('path');

const pluginFolder = path.join(__dirname, '../plugins');
const pluginsDB = path.join(__dirname, '../lib/database.json'); // Hier auf database.json geändert

let handler = async (m, { conn, text }) => {
    // Überprüfen, ob der Absender der Owner ist
    if (!global.owner.includes(m.sender.split('@')[0])) return m.reply('❌ Nur der Owner kann Plugins löschen.');

    // Überprüfen, ob der Plugin-Name angegeben wurde
    if (!text) return m.reply('❗ Format: *.delplug [pluginName]*');

    let name = text.trim();
    const filename = path.join(pluginFolder, `${name}.js`);

    try {
        // Sicherstellen, dass die database.json existiert
        if (!fs.existsSync(pluginsDB)) {
            return m.reply('❌ Die Plugin-Datenbank (database.json) existiert nicht.');
        }

        // Plugins aus der database.json lesen
        let plugins = JSON.parse(fs.readFileSync(pluginsDB));

        // Überprüfen, ob das Plugin in der Datenbank existiert
        if (!plugins[name]) {
            return m.reply(`❗ Das Plugin *${name}* existiert nicht in der Datenbank.`);
        }

        // Plugin aus der Datenbank entfernen
        delete plugins[name];

        // Plugins zurück in die database.json speichern
        fs.writeFileSync(pluginsDB, JSON.stringify(plugins, null, 2));

        // Überprüfen und Löschen der Plugin-Datei im Dateisystem
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
