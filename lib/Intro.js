const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    introCode: { type: String, required: true }, // Code für die Vorstellung
    introducedUsers: { type: Map, of: Object, default: {} }  // Nutzer, die sich vorgestellt haben
});

const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
