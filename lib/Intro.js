const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    introCode: { type: String, required: true }, // Code für die Vorstellung
    introducedUsers: { type: Object, default: {} }  // Statt Map ein einfacher JavaScript-Objekt
});

const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
