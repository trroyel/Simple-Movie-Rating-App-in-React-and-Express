const express = require('express');
const { Language } = require('../models/language');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

/**
 * @name   GET api/languages/
 * @desc   Return all languages order by name asc
 * @access Public
 */
router.get('/', asyncErrorHandler(async (req, res) => {
    const languages = await Language.find();
    if (languages.length === 0) res.status(404).send('no language found!');
    res.send(languages);
}));

/**
 * @name   GET api/languages/:id
 * @desc   Return a single language based on provided id
 * @access Public
 */
router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const language = await Language.findById(req.params.id);
    if (!language) return res.status(404).send('no language find by the given id!');
    res.send(language);
}));

/**
 * @name   POST api/languages/
 * @desc   Save a language provided by request body
 * @access Public
 */
router.post('/', asyncErrorHandler(async (req, res) => {
    const language = new Language({
        name: req.body.name,
        country: req.body.country
    });

    const result = await language.save();
    if (!result) return res.status(500).send('new language is failed to save!')
    res.send(result);
}));

/**
 * @name   PUT api/languages/:id
 * @desc   Update a language data provided by request data
 * @access Public
 */
router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const language = await Language.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!language) return res.status(404).send('no language is found by thr given id!');
    res.send(language);
}));

/**
 * @name   DELETE api/languages/:id
 * @desc   Delete a language language based on provided id
 * @access Public
 */
router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const language = await Language.findByIdAndRemove(req.params.id);
    if (!language) return res.status(404).send('No language found by the given id !!');
    res.send(language);
}));

module.exports = router;