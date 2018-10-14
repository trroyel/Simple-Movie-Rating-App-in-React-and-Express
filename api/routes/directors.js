const express = require('express');
const { Director } = require('../models/director');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

router.get('/', asyncErrorHandler(async (req, res) => {
    const directors = await Director.find().sort('name');
    if (directors.length === 0) res.status(404).send('no director is found!');
    res.send(directors);
}));

router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json('no director is found by the given id .');
    res.send(director);
}));

router.post('/', asyncErrorHandler(async (req, res) => {
    const director = new Director({ name: req.body.name, address: req.body.address });
    const result = await director.save();
    res.send(result);
}));

router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const director = await Director.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!director) res.status(404).send('no director is found by given id!');
    res.send(director);
}));

router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const director = await Director.findByIdAndRemove(req.params.id);
    if (!director) res.status(404).send('No director found by the given id !!');
    res.send(director);
}));

module.exports = router;