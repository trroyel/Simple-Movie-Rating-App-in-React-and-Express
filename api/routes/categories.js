const express = require('express');
const { Category } = require('../models/category');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

/**
 * @name   GET api/categories/
 * @desc   Return all categories order by name asc
 * @access Public
 */
router.get('/', asyncErrorHandler(async (req, res) => {
    const categories = await Category.find().select('name').sort('name');
    if (categories.length === 0) return res.status(404).send('no category is found!');
    res.send(categories);
}));

/**
 * @name   GET api/categories/:id
 * @desc   Return a single category based on provided id
 * @access Public
 */
router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('no category found by given id!');
    res.send(category);
}));

/**
 * @name   POST api/categories/
 * @desc   Save a category provided by request body
 * @access Public
 */
router.post('/', asyncErrorHandler(async (req, res) => {
    const category = new Category({ name: req.body.name });
    const result = await category.save();
    if(!result) return res.status(500).send('new category is failed to save!')
    res.send(result);
}));

/**
 * @name   PUT api/categories/:id
 * @desc   Update a category data provided by request
 * @access Public
 */
router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!category) return res.status(404).send('no category is found by given id!');
    res.send(category);
}));

/**
 * @name   DELETE api/categories/:id
 * @desc   Delete a category category based on provided id
 * @access Public
 */
router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('no category found by given id!');
    res.send(category);
}));

module.exports = router;