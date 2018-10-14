const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "genre name is required!"],
        minlength: 4,
        maxlength: 50
    }
});

const Genre = mongoose.model('genre', genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;