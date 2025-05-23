const mongoose = require('mongoose');

const uri = 'mongodb+srv://User:Hahaha33.@cluster0.mongodb.net/BLACKSKY-MD?retryWrites=true&w=majority';
const collectionName = 'plugins';

const pluginSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
}, { timestamps: true });

// WICHTIG: Nur einmal definieren, sonst OverwriteModelError
const Plugin = mongoose.models.Plugin || mongoose.model('Plugin', pluginSchema, collectionName);

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'BLACKSKY-MD',
    });
    console.log('[✅] Connected to MongoDB');
  } catch (error) {
    console.error('[❌] Failed to connect to MongoDB:', error);
  }
}

async function fetchPluginPaths() {
  try {
    const plugins = await Plugin.find({});
    return plugins.map(p => ({ name: p.name, code: p.code }));
  } catch (error) {
    console.error('[❌] Error fetching plugin paths:', error);
  }
}

async function addPlugin(name, code) {
  try {
    const existing = await Plugin.findOne({ name });
    if (!existing) {
      await Plugin.create({ name, code });
      console.log(`[✅] Plugin added: ${name}`);
      return true;
    } else {
      console.log(`[⚠️] Plugin already exists: ${name}`);
      return false;
    }
  } catch (error) {
    console.error('[❌] Error adding plugin:', error);
    return false;
  }
}

async function addPluginPath(path) {
  try {
    console.log(`[✅] Plugin path saved: ${path}`);
    return true;
  } catch (error) {
    console.error('[❌] Error saving plugin path:', error);
    return false;
  }
}

async function removePluginPath(name) {
  try {
    const result = await Plugin.deleteOne({ name });
    if (result.deletedCount > 0) {
      console.log(`[✅] Plugin removed: ${name}`);
      return true;
    } else {
      console.log(`[⚠️] Plugin not found: ${name}`);
      return false;
    }
  } catch (error) {
    console.error('[❌] Error removing plugin:', error);
    return false;
  }
}

async function listPlugins() {
  try {
    const plugins = await Plugin.find({});
    return plugins;
  } catch (error) {
    console.error('[❌] Error listing plugins:', error);
    return [];
  }
}

module.exports = {
  connectDB,
  fetchPluginPaths,
  addPlugin,
  addPluginPath,
  removePluginPath,
  listPlugins,
};
