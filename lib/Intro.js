const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    introCode: { type: String, required: true },
    introducedUsers: {
        type: Map,
        of: {
            name: String,
            alter: String,
            ort: String
        },
        default: new Map()
    }
});

const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
