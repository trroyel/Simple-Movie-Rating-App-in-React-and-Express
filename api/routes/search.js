const express = require('express');
const mongoose = require('mongoose');
const Content = require('../models/content');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

/**
 * @name   GET api/search/
 * @desc   Return latest 12 contents data with title, actors and image props
 * @access Public
 */
router.get('/', asyncErrorHandler(async (req, res) => {
    const result = await Content.find().select('title actors image').sort('-published').limit(12);
    if (result.length===0) return res.status(404).send(`no content is found!`);
    res.send(result);
}));

/**
 * @name   GET api/search/:key
 * @desc   Return specific properties (like category, title, actors) data based on provided key
 * @access Public
 */
router.get('/:key', asyncErrorHandler(async (req, res) => {
    const val = req.params.key;
    const result = await Content.find().select(val).sort('name');
    if (result.length === 0) return res.status(404).send(`no ${val} is found!`);
    res.send(result);
}));

/**
 * Suppose you want to find all content of bengali language,
 * then your topic is language and name is Bangla. If you want 
 * to search all movie, then your topic will be category and 
 * name will be movie.
 * @name   GET api/search/:topic/:name
 * @desc   Return content based on provided topic and name
 * @access Public
 */
router.get('/:topic/:name', asyncErrorHandler(async (req, res) => {
    const { topic, name } = req.params;
    const searchBy = topic + '.name';

    const result = await Content.find({ [searchBy]: name }).sort('published');
    if (result.length === 0) return res.status(404).send(`no ${name} content is found!`);
    res.send(result);
}));



// router.get('/category/:name', async (req, res) => {
//     const name = req.params.name;
//     const result = await Content.find({ 'category.name': name }).sort('published');
//     if (result.length === 0) res.status(404).send(`no ${name} content is found!`);
//     res.send(result);
// });

// router.get('/genre/:name', async (req, res) => {
//     const name = req.params.name;
//     const result = await Content.find({ 'genre.name': name }).sort('published');
//     if (result.length === 0) res.status(404).send(`no ${name} content is found!`);
//     res.send(result);
// });

// router.get('/director/:name', async (req, res) => {
//     const name = req.params.name;
//     const result = await Content.find({ 'director.name': name }).sort('published');
//     if (result.length === 0) res.status(404).send(`no ${name}'s content is found!`);
//     res.send(result);
// });

// router.get('/writer/:name', async (req, res) => {
//     const name = req.params.name;
//     console.log(req.query);

//     const result = await Content.find({ 'writer.name': name }).sort('published');
//     if (result.length === 0) res.status(404).send(`no ${name}'s content is found!`);
//     res.send(result);
// });

// router.get('/language/:name', async (req, res) => {
//     const name = req.params.name;
//     const result = await Content.find({ 'language.name': name }).sort('published');
//     if (result.length === 0) res.status(404).send(`no ${name}'s content is found!`);
//     res.send(result);
// });


module.exports = router;