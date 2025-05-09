const mongoose = require('mongoose');

const introcodeSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    code: { type: String, required: true }
});

const IntroCode = mongoose.model('IntroCode', introcodeSchema);

module.exports = IntroCode;
