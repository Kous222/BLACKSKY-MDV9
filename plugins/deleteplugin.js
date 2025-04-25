const fs = require('fs');
const path = require('path');

// Path where plugins are stored
const pluginFolder = './plugins';
const metadataFile = './plugins.json'; // File to store plugin metadata

// Delete a plugin by its ID
let handler = async (m, { conn, text }) => {
  // Check if the plugin ID is provided
  if (!text) {
    return m.reply('Bitte gib die ID des Plugins an, das du löschen möchtest!');
  }

  // Parse the plugin ID from the text
  const pluginId = text.trim();

  // Check if the plugin exists in plugins.json
  if (!fs.existsSync(metadataFile)) {
    return m.reply('Es gibt keine gespeicherten Plugins!');
  }

  // Read the metadata file
  let metadata = JSON.parse(fs.readFileSync(metadataFile));

  // Check if the plugin ID exists in metadata
  if (!metadata[pluginId]) {
    return m.reply(`Plugin mit der ID ${pluginId} wurde nicht gefunden!`);
  }

  // Get the file path of the plugin to delete
  const pluginFilePath = path.join(pluginFolder, metadata[pluginId].fileName);

  // Delete the plugin file from the folder
  if (fs.existsSync(pluginFilePath)) {
    fs.unlinkSync(pluginFilePath); // Delete the plugin file
  }

  // Remove the plugin metadata from the metadata file
  delete metadata[pluginId];

  // Save the updated metadata to plugins.json
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  // Send a confirmation message
  m.reply(`Das Plugin mit der ID ${pluginId} wurde erfolgreich gelöscht.`);
};

handler.help = ['deleteplugin <plugin_id>'];
handler.tags = ['admin'];
handler.command = /^deleteplugin$/i;

module.exports = handler;
