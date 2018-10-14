const express = require('express');
const mongoose = require('mongoose');
const Content = require('../models/content');
const { Category } = require('../models/category');
const { Genre } = require('../models/genre');
const { Director } = require('../models/director');
const { Writer } = require('../models/writer');
const { Language } = require('../models/language');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

/**
 * @name   GET api/contents/
 * @desc   Return all contents order by published asc
 * @access Public
 */
router.get('/', asyncErrorHandler(async (req, res) => {
    const contents = await Content.find().sort('published');
    if (contents.length === 0) return res.status(404).send('no content found!');
    res.send(contents);
}));

/**
 * @name   GET api/contents/
 * @desc   Return a single contents based on provided id
 * @access Public
 */
router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).send('no content is found by the given id!');
    res.send(content);
}));

/**
 * @name   POST api/contents/
 * @desc   Save a contents provided by request body
 * @access Public
 */
router.post('/', asyncErrorHandler(async (req, res) => {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const writer = await Writer.findById(req.body.writerId);
    if (!writer) return res.status(400).send('Invalid writer.');

    const director = await Director.findById(req.body.directorId);
    if (!director) return res.status(400).send('Invalid director.');

    const language = await Language.findById(req.body.languageId);
    if (!language) return res.status(400).send('Invalid language.');

    const content = new Content({
        category: {
            _id: category._id,
            name: category.name
        },
        genre: {
            _id: genre._id,
            name: genre.name
        },
        title: req.body.title,
        director: {
            _id: director._id,
            name: director.name
        },
        writer: {
            _id: writer._id,
            name: writer.name
        },
        published: req.body.published,
        actors: req.body.actors,
        country: req.body.country,
        language: {
            _id: language._id,
            name: language.name
        },
        description: req.body.description,
        length: req.body.length,
        rating: req.body.rating,
        image: req.body.image
    });

    const result = await content.save();
    res.send(result);
}));


/**
 * @name   PUT api/contents/:id
 * @desc   Update a contents data provided by request
 * @access Public
 */
router.put('/:id', validateObjectId, (req, res) => {
    res.send('under development!');
});

/**
 * @name   DELETE api/contents/:id
 * @desc   Delete a contents  based on provided id
 * @access Public
 */
router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const content = await Content.findByIdAndRemove(req.params.id);
    if (!content) return res.status(404).send('no content found by the given id!');
    res.send(content);
}));

module.exports = router;