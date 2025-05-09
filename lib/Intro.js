const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    introCode: { type: String, required: true }, // Ensure this field is present
    introducedUsers: { type: Map, of: Object, default: {} }  // Store user introductions
});

const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
