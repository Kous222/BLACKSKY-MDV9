const mongoose = require('mongoose');

const groupSettingsSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true },
  isBanned: { type: Boolean, default: false },
  welcome: { type: Boolean, default: false },
  antiLink: { type: Boolean, default: false },
  delete: { type: Boolean, default: true },
  expired: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model('GroupSettings', groupSettingsSchema);
