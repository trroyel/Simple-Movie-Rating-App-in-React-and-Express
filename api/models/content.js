const mongoose = require('mongoose');
const { categorySchema } = require('./category');
const { genreSchema } = require('./genre');
const { directorSchema } = require('./director');
const { writerSchema } = require('./writer');
const { languageSchema } = require('./language');

const contentSchema = new mongoose.Schema({
    category: {
        type: categorySchema,
        required: [true, "category is required!"],
    },

    genre: {
        type: genreSchema,
        required: [true, "genre is required!"],
    },

    title: {
        type: String,
        required: [true, "title is required!"],
        minlength: 2,
        maxlength: 300
    },

    director: {
        type: directorSchema,
        required: [true, "director is required!"],
    },

    writer: {
        type: writerSchema,
        required: [true, "writer is required!"],
    },

    published: {
        type: Date,
        default: Date.now
    },

    actors: {
        type: [String],
        required: [true, "actors is required!"]
    },

    country: {
        type: String,
        required: [true, "country is required!"]
    },

    language: {
        type: languageSchema,
        required: [true, "language is required!"]
    },

    description: {
        type: String
    },

    length: {
        type: Number,
        required: [true, "length is required!"]
    },

    rating: {
        type: Number,
        required: [true, "rating is required!"]
    },

    image: {
        type: String,
        required: [true, "image is required!"]
    }
});

const Content = mongoose.model('content', contentSchema);

module.exports = Content;