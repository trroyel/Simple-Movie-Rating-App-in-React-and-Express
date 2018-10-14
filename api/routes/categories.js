const express = require('express');
const { Category } = require('../models/category');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const router = express.Router();

router.get('/', asyncErrorHandler(async (req, res) => {
    const categories = await Category.find().sort('name');
    if (categories.length === 0) res.status(404).send('no category is found!');
    res.send(categories);
}));

router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) res.status(404).send('no category found by given id!');
    res.send(category);
}));

router.post('/', asyncErrorHandler(async (req, res) => {
    const category = new Category({ name: req.body.name });
    const result = await category.save();
    res.send(result);
}));

router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!category) res.status(404).send('no category is found by given id!');
    res.send(category);
}));

router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) res.status(404).send('no category found by given id!');
    res.send(category);
}));

module.exports = router;