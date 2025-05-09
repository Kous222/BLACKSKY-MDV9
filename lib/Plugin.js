const mongoose = require('mongoose');

// Define the schema for the Plugin model
const pluginSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // The name must be unique
  code: { type: String, required: true }, // The code field is required
}, { timestamps: true }); // Timestamps will automatically create 'createdAt' and 'updatedAt' fields

// Export the model. If the 'Plugin' model already exists, it will use that one instead of overwriting it.
module.exports = mongoose.models.Plugin || mongoose.model('Plugin', pluginSchema);
