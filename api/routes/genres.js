const express = require('express');
const { Genre } = require('../models/genre');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    if (genres.length === 0) res.status(404).send('no genres is found!');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json('The genre with the given ID is not found.');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const genre = new Genre({ name: req.body.name });
    const result = await genre.save();
    res.send(result);
});

router.put('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!genre) res.status(404).send('no genre is found by given id!');
    res.send(genre);
});

router.delete('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) res.status(404).send('No genre found by the given id !!');
    res.send(genre);
});

module.exports = router;