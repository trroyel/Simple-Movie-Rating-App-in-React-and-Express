const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Category = mongoose.model('category', categorySchema);

module.exports.Category = Category;
module.exports.categorySchema = categorySchema;