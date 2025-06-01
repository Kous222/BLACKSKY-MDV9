const path = require('path');
const { fetchPluginPaths } = require('../lib/mongo.js');

let handler = async function () {
  const pluginPaths = await fetchPluginPaths();

  for (const relPath of pluginPaths) {
    try {
      const absPath = path.resolve('./plugins', relPath);
      const plugin = require(absPath);

      if (plugin?.default || plugin?.run || plugin?.command) {
        global.plugins = global.plugins || [];
        global.plugins.push(plugin.default || plugin);
        console.log(`[✅] Geladenes Plugin: ${relPath}`);
      } else {
        console.log(`[⚠️] Ungültiges Plugin übersprungen: ${relPath}`);
      }
    } catch (err) {
      console.error(`[❌] Fehler beim Laden des Plugins: ${relPath}`, err);
    }
  }
};

handler.run?.();
handler.disabled = false;
handler.command = [];
handler.tags = ['core'];

module.exports = handler;
