import path from 'path';
import { fileURLToPath } from 'url';
import { fetchPluginPaths } from '../lib/mongo.js';

let handler = async function () {
  const pluginPaths = await fetchPluginPaths();

  for (const relPath of pluginPaths) {
    try {
      const absPath = path.resolve('./plugins', relPath);
      const modulePath = `file://${absPath}?cacheBust=${Date.now()}`;
      const plugin = await import(modulePath);

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

// Optional automatisch beim Start ausführen
handler.run?.(); // falls es in einem Plugin-System verwendet wird, das run() direkt aufruft
handler.disabled = false;
handler.command = []; // keine direkte Benutzerinteraktion
handler.tags = ['core'];

export default handler;
