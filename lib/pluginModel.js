const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
}, { timestamps: true });

const Plugin = mongoose.model('Plugin', pluginSchema);

module.exports = Plugin;
