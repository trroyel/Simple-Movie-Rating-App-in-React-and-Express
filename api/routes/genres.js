const express = require('express');
const { Genre } = require('../models/genre');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

/**
 * @name   GET api/genres/
 * @desc   Return all genres order by name asc
 * @access Public
 */
router.get('/', asyncErrorHandler(async (req, res) => {
    const genres = await Genre.find().sort('name');
    if (genres.length === 0) return res.status(404).send('no genres is found!');
    res.send(genres);
}));

/**
 * @name   GET api/genres/:id
 * @desc   Return a single genre based on provided id
 * @access Public
 */
router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID is not found.');
    res.send(genre);
}));

/**
 * @name   POST api/genres/
 * @desc   Save a genre provided by request body
 * @access Public
 */
router.post('/', asyncErrorHandler(async (req, res) => {
    const genre = new Genre({ name: req.body.name });
    const result = await genre.save();
    if (!result) return res.status(500).json('genre is failed to save!');
    res.send(result);
}));

/**
 * @name   PUT api/genres/:id
 * @desc   Update a genre data provided by request
 * @access Public
 */
router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!genre) return res.status(404).send('no genre is found by given id!');
    res.send(genre);
}));

/**
 * @name   DELETE api/genres/:id
 * @desc   Delete a genre genre based on provided id
 * @access Public
 */
router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('No genre found by the given id !!');
    res.send(genre);
}));

module.exports = router;