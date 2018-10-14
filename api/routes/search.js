const express = require('express');
const mongoose = require('mongoose');
const Content = require('../models/content');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const router = express.Router();

router.get('/', asyncErrorHandler(async (req, res) => {
    const result = await Content.find().select('title actors image').sort('-published').limit(12);
    if (!result) return res.status(404).send(`no content is found!`);
    res.send(result);
}));

router.get('/:key', asyncErrorHandler(async (req, res) => {
    const val = req.params.key;
    const result = await Content.find().select(val).sort('name');
    if (result.length === 0) return res.status(404).send(`no ${val} is found!`);
    res.send(result);
}));

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