const fs = require('fs');
const path = require('path');

// Path where plugins are stored
const pluginFolder = './plugins';
const metadataFile = './plugins.json'; // File to store plugin metadata

// Adding a new plugin
let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply('Bitte gib den Code des Plugins an!');
  }

  // Define the plugin file path and metadata file path
  const pluginId = Date.now(); // Unique ID for plugin (timestamp)
  const pluginFilePath = path.join(pluginFolder, `${pluginId}.js`);

  // Write the plugin code to the new file
  fs.writeFileSync(pluginFilePath, text);

  // Check if plugins.json exists, if not, create it
  let metadata = {};
  if (fs.existsSync(metadataFile)) {
    metadata = JSON.parse(fs.readFileSync(metadataFile));
  } else {
    // Create an empty metadata object if the file doesn't exist
    fs.writeFileSync(metadataFile, JSON.stringify({}, null, 2));
  }

  // Add new plugin metadata
  metadata[pluginId] = {
    fileName: `${pluginId}.js`,
    code: text
  };

  // Save updated metadata to plugins.json
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  // Send confirmation message with the plugin ID
  m.reply(`Das Plugin wurde erfolgreich hinzugefügt! Es wurde unter der ID '${pluginId}' gespeichert.`);
};

handler.help = ['addplugin <plugin_code>'];
handler.tags = ['admin'];
handler.command = /^addplugin$/i;

module.exports = handler;
