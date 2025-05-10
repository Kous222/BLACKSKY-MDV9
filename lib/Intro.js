const mongoose = require('mongoose');

const userIntroSchema = new mongoose.Schema({
    name: String,
    alter: String,
    ort: String
}, { _id: false });

const introSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    introCode: { type: String, required: true },
    introducedUsers: { type: Object, of: userIntroSchema, default: {} }
});

const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
