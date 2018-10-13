const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
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

const Writer = mongoose.model('writer', writerSchema);

module.exports.Writer = Writer;
module.exports.writerSchema = writerSchema;