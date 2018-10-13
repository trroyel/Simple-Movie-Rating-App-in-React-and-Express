const express = require('express');
const { Writer } = require('../models/writer');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', async (req, res) => {
    const writers = await Writer.find().sort('name');
    if (writers.length === 0) res.status(404).send('no writer is found!');
    res.send(writers);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const writer = await Writer.findById(req.params.id);
    if (!writer) return res.status(404).json('The writer with the given ID is not found.');
    res.send(writer);
});

router.post('/', async (req, res) => {
    const writer = new Writer({ name: req.body.name, address: req.body.address });
    const result = await writer.save();
    res.send(result);
});

router.put('/:id', validateObjectId, async (req, res) => {
    const writer = await Writer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!writer) res.status(404).send('no writer is found by given id!');
    res.send(writer);
});

router.delete('/:id', validateObjectId, async (req, res) => {
    const writer = await Writer.findByIdAndRemove(req.params.id);
    if (!writer) res.status(404).send('No writer found by the given id !!');
    res.send(writer);
});

module.exports = router;