const fs = require('fs');
const path = require('path');

// Path where plugins will be saved
const pluginFolder = './plugins';

// Handler for adding new plugins dynamically
let handler = async (m, { conn, text }) => {
  // Ensure the user has provided code to add as a plugin
  if (!text) {
    return m.reply('Bitte gib den JavaScript-Code für das neue Plugin an!');
  }

  // Check if the code has a valid structure (you can add more checks)
  const isValidPluginCode = text.includes('module.exports = handler;');
  if (!isValidPluginCode) {
    return m.reply('Der Code scheint kein gültiges Plugin zu sein!');
  }

  // Generate a filename for the new plugin
  const pluginName = `plugin_${Date.now()}.js`; // Use timestamp to create a unique name
  const pluginPath = path.join(pluginFolder, pluginName);

  // Create the plugins folder if it doesn't exist
  if (!fs.existsSync(pluginFolder)) {
    fs.mkdirSync(pluginFolder);
  }

  // Save the code to a new file
  fs.writeFileSync(pluginPath, text);

  // Reload the new plugin (this will be handled dynamically)
  try {
    require(pluginPath); // Dynamically load the new plugin
    m.reply(`Plugin erfolgreich hinzugefügt und geladen: ${pluginName}`);
  } catch (error) {
    m.reply(`Fehler beim Laden des Plugins: ${error.message}`);
  }
};

handler.help = ['addplugin <plugin_code>'];
handler.tags = ['admin'];
handler.command = /^addplugin$/i; // Can be adjusted as needed

module.exports = handler;
