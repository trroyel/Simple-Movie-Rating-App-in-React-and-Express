const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    address: {
        type: String,
    }
});

const Director = mongoose.model('director', directorSchema);

module.exports.Director = Director;
module.exports.directorSchema = directorSchema;