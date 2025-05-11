const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true },
  banned: { type: Boolean, default: false },
  bannedTime: { type: Number, default: 0 },
  // other fields...
});

// Check if the model already exists to avoid overwriting
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
