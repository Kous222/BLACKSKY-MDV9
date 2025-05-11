// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true },
  banned: { type: Boolean, default: false },
  bannedTime: { type: Number, default: 0 },
  // other fields...
});

module.exports = mongoose.model('User', userSchema);
