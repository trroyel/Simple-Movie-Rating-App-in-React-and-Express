const mongoose = require('mongoose');
const { categorySchema } = require('./category');
const { genreSchema } = require('./genre');
const { directorSchema } = require('./director');
const { writerSchema } = require('./writer');
const { languageSchema } = require('./language');

const contentSchema = new mongoose.Schema({
    category: {
        type: categorySchema,
        required: true,
    },

    genre: {
        type: genreSchema,
        required: true
    },

    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 300
    },

    director: {
        type: directorSchema,
        required: true,
    },

    writer: {
        type: writerSchema,
        required: true,
    },

    published: {
        type: Date,
        default: Date.now
    },

    actors: {
        type: [String],
        required: true
    },

    country: {
        type: String,
        required:true
    },

    language: {
        type: languageSchema,
        required: true
    },

    description: {
        type: String
    },

    length: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    }
});

const Content = mongoose.model('content', contentSchema);

module.exports = Content;