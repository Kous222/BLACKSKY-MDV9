const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    introCode: { type: String, required: true },
    introducedUsers: { type: Object, default: {} } // <-- ÄNDERUNG: Kein Map!
});

const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
