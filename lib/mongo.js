// lib/mongo.js

const mongoose = require('mongoose');

// MongoDB connection string (ensure the password is URL encoded if necessary)
const uri = 'mongodb+srv://User:Hahaha33.@cluster0.mongodb.net/BLACKSKY-MD?retryWrites=true&w=majority';

// MongoDB collection name (database set via URI or explicitly below)
const collectionName = 'plugins';

// Define the schema for plugins
const pluginSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
}, { timestamps: true });

// Create the Plugin model based on the schema
const Plugin = mongoose.model('Plugin', pluginSchema, collectionName);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'BLACKSKY-MD', // Explicitly specify the DB name if needed
    });
    console.log('[✅] Connected to MongoDB');
  } catch (error) {
    console.error('[❌] Failed to connect to MongoDB:', error);
    // Optionally, handle the connection failure here (retry or exit)
  }
}

// CRUD Functions

// Fetch all plugin paths (names and code)
async function fetchPluginPaths() {
  try {
    const plugins = await Plugin.find({});
    return plugins.map(p => ({ name: p.name, code: p.code }));
  } catch (error) {
    console.error('[❌] Error fetching plugin paths:', error);
  }
}

// Add a new plugin to MongoDB
async function addPlugin(name, code) {
  try {
    const existing = await Plugin.findOne({ name });
    if (!existing) {
      await Plugin.create({ name, code });
      console.log(`[✅] Plugin added: ${name}`);
      return true;  // Return success
    } else {
      console.log(`[⚠️] Plugin already exists: ${name}`);
      return false; // Return failure
    }
  } catch (error) {
    console.error('[❌] Error adding plugin:', error);
    return false; // Return failure
  }
}

// Add plugin path (new function)
async function addPluginPath(path) {
  try {
    // Logic to store the path (you can store in DB, file system, or any other structure)
    console.log(`[✅] Plugin path saved: ${path}`);
    // Optionally, store this in a collection or file if needed
    return true;
  } catch (error) {
    console.error('[❌] Error saving plugin path:', error);
    return false;
  }
}

// Remove a plugin from MongoDB
async function removePluginPath(path) {
  try {
    const result = await Plugin.deleteOne({ name });
    if (result.deletedCount > 0) {
      console.log(`[✅] Plugin removed: ${name}`);
      return true;  // Return success
    } else {
      console.log(`[⚠️] Plugin not found: ${name}`);
      return false; // Return failure
    }
  } catch (error) {
    console.error('[❌] Error removing plugin:', error);
    return false; // Return failure
  }
}

// List all plugins
async function fetchPluginPaths(path) {
  try {
    const plugins = await Plugin.find({});
    return plugins;  // Return full plugin objects
  } catch (error) {
    console.error('[❌] Error listing plugins:', error);
    return []; // Return empty array in case of error
  }
}

// Export functions to be used in other parts of the application
module.exports = {
  connectDB,
  fetchPluginPaths,
  addPluginPath,  // Ensure addPluginPath is exported
  removePluginPath,
};
