const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "language name is required!"]
    },
    country: {
        type: String
    }
});

const Language = mongoose.model('language', languageSchema);

module.exports.Language = Language;
module.exports.languageSchema = languageSchema;