const express = require('express');
const { Director } = require('../models/director');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

/**
 * @name   GET api/directors/
 * @desc   Return all directors order by name asc
 * @access Public
 */
router.get('/', asyncErrorHandler(async (req, res) => {
    const directors = await Director.find().select('name').sort('name');
    if (directors.length === 0) return res.status(404).send('no director is found!');
    res.send(directors);
}));

/**
 * @name   GET api/directors/:id
 * @desc   Return a single director based on provided id
 * @access Public
 */
router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).send('no director is found by the given id .');
    res.send(director);
}));

/**
 * @name   POST api/directors/
 * @desc   Save a director provided by request body
 * @access Public
 */
router.post('/', asyncErrorHandler(async (req, res) => {
    const director = new Director({ name: req.body.name, address: req.body.address });
    const result = await director.save();
    if(!result) return res.status(500).send('director\'s data is failed to save');
    res.send(result);
}));

/**
 * @name   PUT api/directors/:id
 * @desc   Update a director data provided by request
 * @access Public
 */
router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const director = await Director.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!director) return res.status(404).send('no director is found by given id!');
    res.send(director);
}));

/**
 * @name   DELETE api/directors/:id
 * @desc   Delete a director director based on provided id
 * @access Public
 */
router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const director = await Director.findByIdAndRemove(req.params.id);
    if (!director) return res.status(404).send('No director found by the given id !!');
    res.send(director);
}));

module.exports = router;